import React, { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  currentUrl: string;
  folder: 'slides' | 'questions';
  onUploaded: (url: string) => void;
}

type UploadStatus = 'compressing' | 'uploading' | 'processing' | null;

const compressImage = (file: File, maxPx = 1600, quality = 0.85): Promise<File> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        if (width >= height) { height = Math.round(height * maxPx / width); width = maxPx; }
        else { width = Math.round(width * maxPx / height); height = maxPx; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        blob => blob
          ? resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
          : reject(new Error('Compression failed')),
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Could not load image')); };
    img.src = objectUrl;
  });

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentUrl, folder, onUploaded }) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    setError('');
    setProgress(0);
    setUploadStatus('compressing');

    let uploadFile = file;
    try {
      uploadFile = await compressImage(file);
    } catch {
      // Fall back to original if compression fails
    }

    setUploadStatus('uploading');
    const filename = `${Date.now()}.jpg`;
    const storageRef = ref(storage, `${folder}/${filename}`);
    const task = uploadBytesResumable(storageRef, uploadFile);

    task.on(
      'state_changed',
      snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      err => { setError(err.message); setProgress(null); setUploadStatus(null); },
      async () => {
        setUploadStatus('processing');
        const url = await getDownloadURL(task.snapshot.ref);
        onUploaded(url);
        setProgress(null);
        setUploadStatus(null);
      }
    );
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so the same file can be re-selected if needed
    e.target.value = '';
  };

  const isBusy = uploadStatus !== null;

  return (
    <div className="space-y-2">
      {/* Preview */}
      {currentUrl && (
        <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
          <img src={currentUrl} alt="Preview" className="w-full h-full object-contain" />
          <button
            type="button"
            onClick={() => onUploaded('')}
            className="absolute top-2 right-2 p-1 bg-slate-900/80 hover:bg-red-600 text-white rounded-lg transition-colors"
            title="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => !isBusy && inputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${
          isBusy
            ? 'border-brand-500 bg-brand-950/20 cursor-wait'
            : 'border-slate-700 hover:border-brand-500 hover:bg-slate-800/50'
        }`}
      >
        {isBusy ? (
          <>
            <Loader2 size={24} className="text-brand-400 animate-spin" />
            {uploadStatus === 'compressing' && (
              <p className="text-sm text-slate-300">Compressing image...</p>
            )}
            {uploadStatus === 'uploading' && (
              <>
                <p className="text-sm text-slate-300">Uploading... {progress}%</p>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-brand-500 h-1.5 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            )}
            {uploadStatus === 'processing' && (
              <p className="text-sm text-slate-300">Processing...</p>
            )}
          </>
        ) : (
          <>
            <div className="p-2.5 bg-slate-800 rounded-lg">
              {currentUrl ? <ImageIcon size={20} className="text-slate-400" /> : <Upload size={20} className="text-slate-400" />}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-300">
                {currentUrl ? 'Replace image' : 'Upload image'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Click or drag & drop · JPG, PNG, WEBP · auto-compressed</p>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};
