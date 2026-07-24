import React from 'react';
import { Mail, Target, Compass, FlaskConical, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface TeamMember {
  name: string;
  faculty: string;
  group?: string;
  roles: string[];
  photo?: string;
}

const projectLeader: TeamMember = {
  name: 'Dr. Siti Farizan Mansor',
  faculty: 'Faculty of Health Sciences, Universiti Teknologi MARA (UiTM), Malaysia',
  group: 'Molecular Therapeutics and Cancer Translational Health (MATCH)',
  roles: ['Project Leader', 'Principal Investigator', 'Conceptualisation', 'Cytology Expert'],
  photo: '/images/team/siti-farizan-mansor.png',
};

const researchTeam: TeamMember[] = [
  {
    name: 'Assoc. Prof. Dr. Wan Ismahanisa Ismail',
    faculty: 'Faculty of Health Sciences, Universiti Teknologi MARA (UiTM), Malaysia',
    group: 'Community Health and Wellness Entrepreneurship (CHWE)',
    roles: ['Cytology Expert', 'Content Validation'],
    photo: '/images/team/wan-ismahanisa-ismail.jpg',
  },
  {
    name: 'Dr. Syarifah Masyitah Habib Dzulkarnain',
    faculty: 'Faculty of Health Sciences, Universiti Teknologi MARA (UiTM), Malaysia',
    group: 'Molecular Therapeutics and Cancer Translational Health (MATCH)',
    roles: ['Cytology Expert', 'Content Validation'],
    photo: '/images/team/syarifah-masyitah-habib-dzulkarnain.jpeg',
  },
  {
    name: 'Dr. Nurhidayah Ab. Rahim',
    faculty: 'Faculty of Health Sciences, Universiti Teknologi MARA (UiTM), Malaysia',
    group: 'Molecular Therapeutics and Cancer Translational Health (MATCH)',
    roles: ['Cytology Expert', 'Content Validation'],
    photo: '/images/team/nurhidayah-ab-rahim.jpeg',
  },
  {
    name: 'Dr. Nor Raihan Mohammad Shabani',
    faculty: 'Faculty of Health Sciences, Universiti Teknologi MARA (UiTM), Malaysia',
    group: 'Molecular Therapeutics and Cancer Translational Health (MATCH)',
    roles: ['Cytology Expert', 'Content Validation'],
    photo: '/images/team/nor-raihan-mohammad-shabani.jpeg',
  },
  {
    name: 'Dr. Shahirah Mohamed Hatim',
    faculty: 'Faculty of Computer and Mathematical Sciences, Universiti Teknologi MARA (UiTM), Malaysia',
    group: 'Machine Learning and Interactive Visualization (MaliV)',
    roles: ['System Architecture', 'Platform Design', 'Software Development'],
    photo: '/images/team/shahirah-mohamed-hatim.png',
  },
  {
    name: 'Amirul Hakimi Abdullah Sani',
    faculty: 'Software Engineer, The Access Group APAC',
    group: 'Faculty of Computer and Mathematical Sciences, Universiti Teknologi MARA (UiTM), Malaysia',
    roles: ['Full-Stack Developer', 'Platform Development', 'System Integration'],
    photo: '/images/team/amirul-hakimi-abdullah-sani.png',
  },
];

const missionItems = [
  'To provide accessible, expert-guided competency development in cervical cytology.',
  'To standardise competency assessment using evidence-based digital tools.',
  'To support the development of a competent cytology workforce for cervical cancer screening.',
  'To foster research and innovation in digital pathology and medical education.',
];

const collaboratingUnits = [
  'Faculty of Health Sciences, Universiti Teknologi MARA (UiTM)',
  'Faculty of Computer and Mathematical Sciences, Universiti Teknologi MARA (UiTM)',
  'Molecular Therapeutics and Cancer Translational Health (MATCH)',
  'Community Health and Wellness Entrepreneurship (CHWE)',
  'Machine Learning and Interactive Visualization (MaliV)',
];

const researchFocus = [
  'Cervical Cancer Screening',
  'Digital Pathology',
  'Cytopathology Education',
  'Diagnostic Competency Assessment',
  'Medical Education Technology',
  'Digital Health Innovation',
];

const TeamCard: React.FC<{ member: TeamMember; featured?: boolean }> = ({ member, featured }) => (
  <Card padding="lg" className={featured ? 'sm:flex sm:items-center sm:gap-6' : ''}>
    <div className={`flex flex-col items-center text-center ${featured ? 'sm:shrink-0' : ''}`}>
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className={`rounded-2xl object-cover object-top bg-slate-100 ${featured ? 'w-32 h-32' : 'w-24 h-24'}`}
        />
      ) : (
        <div className={`rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center font-display font-bold ${featured ? 'w-32 h-32 text-3xl' : 'w-24 h-24 text-2xl'}`}>
          {member.name.split(' ').filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('')}
        </div>
      )}
    </div>

    <div className={`mt-4 ${featured ? 'sm:mt-0 sm:text-left' : 'text-center'}`}>
      <p className="font-display font-bold text-slate-900">{member.name}</p>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{member.faculty}</p>
      {member.group && <p className="text-xs text-slate-400 mt-1">{member.group}</p>}
      <div className={`flex flex-wrap gap-1.5 mt-3 ${featured ? '' : 'justify-center'}`}>
        {member.roles.map(role => (
          <span key={role} className="text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
            {role}
          </span>
        ))}
      </div>
    </div>
  </Card>
);

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">

      {/* Hero */}
      <div>
        <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-2">About PapVision</p>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
          Advancing Cervical Cancer Prevention Through Digital Competency Assessment
        </h1>
        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          PapVision is a web-based digital competency assessment platform developed to strengthen diagnostic
          competency in cervical cytology and support high-quality cervical cancer screening. The platform
          integrates expert-annotated cervical cytology images, interactive case-based learning, structured
          competency assessment, and personalised feedback to provide a standardised and accessible learning
          experience.
        </p>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          Developed by a multidisciplinary team of cytology, cancer research, and computer science experts,
          PapVision addresses the growing need for scalable, evidence-based training solutions amid the limited
          availability of expert mentors and standardised teaching resources. By enabling continuous competency
          development and objective performance assessment, PapVision aims to support the preparation of future
          cytoscreeners, cytopathologists, and Medical Laboratory Technologists involved in cervical cancer
          screening.
        </p>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          PapVision also serves as a research platform to support digital pathology innovation, competency
          assessment, and future advancements in technology-enhanced cancer diagnosis.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="lg">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-3">
            <Compass size={16} />
          </div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Our Vision</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            To advance cervical cancer prevention through innovative digital technologies that strengthen
            diagnostic competency, promote standardised training, and improve the quality of cervical cancer
            screening and diagnosis.
          </p>
        </Card>

        <Card padding="lg">
          <div className="w-9 h-9 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center mb-3">
            <Target size={16} />
          </div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Our Mission</h2>
          <ul className="space-y-1.5">
            {missionItems.map(item => (
              <li key={item} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                <span className="text-accent-400 shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Research & Development Team */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Research &amp; Development Team</h2>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Project Leader</p>
          <TeamCard member={projectLeader} featured />
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 mt-6">Research Team</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchTeam.map(m => <TeamCard key={m.name} member={m} />)}
          </div>
        </div>
      </div>

      {/* Collaborating Units + Research Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="lg">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Collaborating Units</h2>
          <ul className="space-y-1.5">
            {collaboratingUnits.map(item => (
              <li key={item} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                <span className="text-brand-400 shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
        </Card>

        <Card padding="lg">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Research Focus</h2>
          <div className="flex flex-wrap gap-1.5">
            {researchFocus.map(item => (
              <span key={item} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Acknowledgement */}
      <Card padding="lg">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
          <FlaskConical size={16} />
        </div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Acknowledgement</h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          PapVision is a multidisciplinary research initiative developed by researchers from Universiti Teknologi
          MARA (UiTM), integrating expertise in cancer research, cytopathology, medical laboratory science, medical
          education, and software engineering to strengthen competency in cervical cancer screening.
        </p>
      </Card>

      {/* Contact */}
      <Card padding="lg">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Contact</h2>
        <p className="text-sm font-semibold text-slate-900">Project Lead — Dr. Siti Farizan Mansor</p>
        <p className="text-xs text-slate-500 mt-1">Faculty of Health Sciences, Universiti Teknologi MARA (UiTM), Malaysia</p>
        <a
          href="mailto:sitifarizan@uitm.edu.my"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 mt-3"
        >
          <Mail size={14} /> sitifarizan@uitm.edu.my
        </a>
      </Card>

      {/* Version + IP */}
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <Card padding="lg" className="md:w-56 shrink-0">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Version</h2>
          <p className="text-lg font-display font-bold text-slate-900">PapVision v1.0</p>
        </Card>

        <Card padding="lg" className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={15} className="text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Intellectual Property</h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            © 2026, Universiti Teknologi MARA (UiTM). All Rights Reserved. PapVision is proprietary software
            developed by the PapVision Research Team. The platform, including its software, user interface,
            educational content, annotated cytology images, databases, graphics, and documentation, is protected
            under applicable copyright and intellectual property laws. No part of this platform may be reproduced,
            modified, distributed, or used without prior written permission from the copyright owner.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default About;
