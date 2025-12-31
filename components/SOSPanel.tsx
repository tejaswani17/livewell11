
import React, { useState } from 'react';

const SOSPanel: React.FC = () => {
  const [calling, setCalling] = useState<string | null>(null);

  const contacts = [
    { name: 'Family (Son)', role: 'Emergency Contact', color: 'bg-emerald-500', phone: '555-0123' },
    { name: 'Dr. Sarah Wilson', role: 'Cardiologist', color: 'bg-blue-500', phone: '555-0199' },
    { name: '911 Emergency', role: 'Emergency Services', color: 'bg-red-600', phone: '911' },
  ];

  const handleCall = (name: string) => {
    setCalling(name);
    setTimeout(() => {
      setCalling(null);
      alert(`Calling ${name}... In a real app, this would trigger a phone dial.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-red-50 px-6 pt-12 flex flex-col items-center">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a13.247 13.247 0 0 1-1.022-2.313m2.684-1.902a18.19 18.19 0 0 1 0-8.818m0 8.818c.411.305.827.59 1.247.856m-1.247-9.674c.411-.305.827-.59 1.247-.856m1.247 9.674c1.171.603 2.455.975 3.82 1.09a2.25 2.25 0 0 0 2.43-2.228V7.31a2.25 2.25 0 0 0-2.43-2.228c-1.365.115-2.649.487-3.82 1.09m1.247 9.674a22.509 22.509 0 0 1-1.247-9.674m1.247 9.674h.008v.008h-.008v-.008Zm.356-9.674h.008v.008h-.008v-.008Z" />
        </svg>
      </div>

      <h1 className="text-3xl font-black text-red-700 mb-2">Emergency Help</h1>
      <p className="text-red-600 font-medium mb-12 text-center text-lg">Tap a contact to call for help immediately.</p>

      <div className="w-full space-y-6">
        {contacts.map((contact, idx) => (
          <button
            key={idx}
            onClick={() => handleCall(contact.name)}
            disabled={!!calling}
            className={`w-full ${contact.color} p-8 rounded-[40px] shadow-xl flex flex-col items-center justify-center text-white transition transform active:scale-95 relative overflow-hidden`}
          >
            {calling === contact.name && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 backdrop-blur-sm">
                <span className="font-bold text-2xl animate-pulse">CALLING...</span>
              </div>
            )}
            <span className="text-2xl font-black mb-1">{contact.name}</span>
            <span className="text-white/80 font-semibold">{contact.role}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 w-full bg-white/50 p-6 rounded-3xl border border-red-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-red-400 font-bold uppercase tracking-wider">Your Location</p>
          <p className="text-red-700 font-bold">123 Health Ave, Suite 4</p>
        </div>
      </div>
    </div>
  );
};

export default SOSPanel;
