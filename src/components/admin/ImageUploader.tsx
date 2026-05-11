import React, { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  currentUrl: string;
  folder: 'slides' | 'questions';
  onUploaded: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentUrl, folder, onUploaded }) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const MAX_MB = 5;
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_MB}MB.`);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    setError('');
    setProgress(0);

    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `${Date.now()}.${ext}`;
    const storageRef = ref(storage, `${folder}/${filename}`);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      'state_changed',
      snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      err => { setError(err.message); setProgress(null); },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onUploaded(url);
        setProgress(null);
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
  };

  const isUploading = progress !== null;

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
        onClick={() => !isUploading && inputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${
          isUploading
            ? 'border-brand-500 bg-brand-950/20 cursor-wait'
            : 'border-slate-700 hover:border-brand-500 hover:bg-slate-800/50'
        }`}
      >
        {isUploading ? (
          <>
            <Loader2 size={24} className="text-brand-400 animate-spin" />
            <p className="text-sm text-slate-300">Uploading... {progress}%</p>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
              <div
                className="bg-brand-500 h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
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
              <p className="text-xs text-slate-500 mt-0.5">Click or drag & drop · JPG, PNG, WEBP · max 5MB</p>
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
