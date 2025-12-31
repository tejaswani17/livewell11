
import React from 'react';
import { UserProfile } from '../types';
import { Icons } from '../constants';

interface Props {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onBack: () => void;
}

const ProfileSettings: React.FC<Props> = ({ profile, onUpdate, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate({ ...profile, [e.target.name]: e.target.value });
  };

  const isHindi = profile.language === 'hi';

  return (
    <div className="px-6 pt-8 pb-24 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-3 bg-slate-100 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-slate-800">{isHindi ? 'मेरा प्रोफाइल' : 'My Profile'}</h1>
      </div>

      <div className="bg-white p-6 rounded-[40px] shadow-sm border-b-8 border-blue-100 space-y-6">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 border-4 border-white shadow-md">
            <Icons.User />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{isHindi ? 'पंजीकृत उपयोगकर्ता' : 'Registered User'}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-500 font-bold mb-2 ml-2">{isHindi ? 'नाम' : 'Name'}</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xl font-bold text-slate-800 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-2 ml-2">{isHindi ? 'आयु' : 'Age'}</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xl font-bold text-slate-800 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-2 ml-2">{isHindi ? 'आपातकालीन फोन' : 'Emergency Phone'}</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-xl font-bold text-slate-800 outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[40px] shadow-sm border-b-8 border-amber-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Icons.Settings />
          {isHindi ? 'ऐप सेटिंग्स' : 'App Settings'}
        </h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
            <span className="font-bold text-slate-700 text-lg">{isHindi ? 'भाषा' : 'Language'}</span>
            <select
              name="language"
              value={profile.language}
              onChange={handleChange}
              className="bg-white border-2 border-slate-200 rounded-xl px-4 py-2 font-bold text-blue-600 outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
