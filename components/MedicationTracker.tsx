
import React from 'react';
import { Medication } from '../types';
import { Icons } from '../constants';

interface Props {
  meds: Medication[];
  onAction: (id: string, action: 'taken' | 'skipped' | 'snooze') => void;
}

const MedicationTracker: React.FC<Props> = ({ meds, onAction }) => {
  return (
    <div className="px-6 pt-8 pb-24 space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-slate-800">My Medicine</h1>
        <button className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-2xl text-lg">+ Add New</button>
      </div>

      <div className="space-y-4">
        {meds.map(med => (
          <div key={med.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${med.color} rounded-2xl flex items-center justify-center text-white shadow-inner`}>
                <Icons.Medkit />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-slate-800">{med.name}</h3>
                  <span className="text-blue-700 font-black bg-blue-50 px-3 py-1 rounded-xl text-lg">{med.time}</span>
                </div>
                <p className="text-slate-500 font-bold text-lg">{med.dosage}</p>
              </div>
            </div>

            {med.status === 'pending' ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => onAction(med.id, 'taken')}
                  className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl py-5 rounded-2xl shadow-md transition transform active:scale-95"
                >
                  I Took It
                </button>
                <button 
                  onClick={() => onAction(med.id, 'snooze')}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-5 rounded-2xl transition"
                >
                  Later
                </button>
                <button 
                  onClick={() => onAction(med.id, 'skipped')}
                  className="px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-5 rounded-2xl transition"
                >
                  Skip
                </button>
              </div>
            ) : (
              <div className={`flex items-center justify-center p-5 rounded-2xl font-black text-xl ${med.status === 'taken' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {med.status === 'taken' ? '✓ Finished at ' + med.time : '⚠ Not taken today'}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl text-center border-2 border-blue-100">
        <p className="text-blue-800 font-bold text-lg italic">"Arthur, you are doing great! You've taken almost all your pills this week."</p>
      </div>
    </div>
  );
};

export default MedicationTracker;
