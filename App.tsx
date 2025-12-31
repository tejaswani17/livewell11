
import React, { useState, useEffect } from 'react';
// Fixed: Removed non-existent export 'Exercise' from './types'
import { Medication, VitalReading, VitalsData, Screen, UserProfile } from './types';
import { Icons, COLORS } from './constants';
import MedicationTracker from './components/MedicationTracker';
import SOSPanel from './components/SOSPanel';
import HealthCharts from './components/HealthCharts';
import BrainGameMemory from './components/BrainGameMemory';
import ProfileSettings from './components/ProfileSettings';
import { getHealthNudge } from './services/geminiService';

const DICTIONARY = {
  en: {
    greeting: "Hi",
    subGreeting: "It's a beautiful day to stay healthy.",
    healthTip: "Quick Health Tip",
    myPills: "My Pills",
    nextDue: "Next",
    funGames: "Fun Games",
    brainSharp: "Keep brain sharp",
    healthCheck: "My Health Check",
    heartBeat: "Heart Beat",
    walkingSteps: "Walking Steps",
    records: "My Health Records",
    home: "Home",
    pills: "Pills",
    vitals: "Vitals",
    games: "Games",
    help: "Help"
  },
  hi: {
    greeting: "नमस्ते",
    subGreeting: "स्वस्थ रहने के लिए आज एक खूबसूरत दिन है।",
    healthTip: "स्वास्थ्य टिप",
    myPills: "मेरी दवाएं",
    nextDue: "अगली",
    funGames: "दिमागी खेल",
    brainSharp: "दिमाग तेज रखें",
    healthCheck: "मेरी सेहत की जांच",
    heartBeat: "दिल की धड़कन",
    walkingSteps: "पैदल कदम",
    records: "मेरे स्वास्थ्य रिकॉर्ड",
    home: "मुख्य",
    pills: "दवाएं",
    vitals: "जांच",
    games: "खेल",
    help: "मदद"
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Screen>('home');
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Rajesh Kumar',
    age: '72',
    phone: '9876543210',
    language: 'en'
  });

  const [meds, setMeds] = useState<Medication[]>([
    { id: '1', name: 'Aspirin', dosage: '75mg', time: '09:00 AM', color: 'bg-red-500', status: 'pending' },
    { id: '2', name: 'Metformin', dosage: '500mg', time: '01:00 PM', color: 'bg-blue-500', status: 'pending' },
    { id: '3', name: 'Atorvastatin', dosage: '20mg', time: '08:00 PM', color: 'bg-green-500', status: 'pending' },
  ]);

  const [vitals, setVitals] = useState<VitalsData>({
    heartRate: [
      { date: 'Mon', value: 72 }, { date: 'Tue', value: 75 }, { date: 'Wed', value: 71 },
      { date: 'Thu', value: 78 }, { date: 'Fri', value: 73 }, { date: 'Sat', value: 74 }, { date: 'Sun', value: 72 }
    ],
    bloodPressure: [
      { date: 'Mon', value: 120 }, { date: 'Tue', value: 122 }, { date: 'Wed', value: 119 },
      { date: 'Thu', value: 125 }, { date: 'Fri', value: 121 }, { date: 'Sat', value: 118 }, { date: 'Sun', value: 120 }
    ],
    bloodSugar: [
      { date: 'Mon', value: 95 }, { date: 'Tue', value: 98 }, { date: 'Wed', value: 94 },
      { date: 'Thu', value: 102 }, { date: 'Fri', value: 96 }, { date: 'Sat', value: 93 }, { date: 'Sun', value: 95 }
    ],
    steps: [
      { date: 'Mon', value: 4500 }, { date: 'Tue', value: 5200 }, { date: 'Wed', value: 3100 },
      { date: 'Thu', value: 6000 }, { date: 'Fri', value: 4800 }, { date: 'Sat', value: 7200 }, { date: 'Sun', value: 4100 }
    ],
  });

  const [nudge, setNudge] = useState<string>("Loading...");

  const t = DICTIONARY[profile.language];

  useEffect(() => {
    const fetchNudge = async () => {
      setNudge(profile.language === 'hi' ? "स्वास्थ्य टिप लोड हो रही है..." : "Loading your health nudge...");
      const text = await getHealthNudge(`Mood of ${profile.name}, heart patient, ${profile.age}yo`, profile.language);
      setNudge(text);
    };
    fetchNudge();
  }, [profile.language]);

  const handleMedAction = (id: string, action: 'taken' | 'skipped' | 'snooze') => {
    if (action === 'snooze') {
      alert(profile.language === 'hi' ? "रिमाइंडर 15 मिनट के लिए टाला गया" : "Reminder snoozed for 15 minutes");
      return;
    }
    setMeds(prev => prev.map(m => m.id === id ? { ...m, status: action } : m));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 pb-24">
            <header className="px-6 pt-8 pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{t.greeting}, {profile.name}! 👋</h1>
                <p className="text-slate-500 text-lg">{t.subGreeting}</p>
              </div>
              <button 
                onClick={() => setActiveTab('profile')}
                className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm transition active:scale-95"
              >
                <Icons.User />
              </button>
            </header>

            <section className="px-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-[40px] text-white shadow-lg relative overflow-hidden border-b-8 border-blue-900">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icons.Sparkles />
                    <span className="font-semibold uppercase tracking-wider text-xs opacity-80">{t.healthTip}</span>
                  </div>
                  <p className="text-xl font-medium leading-relaxed">{nudge}</p>
                </div>
                <div className="absolute top-[-20px] right-[-20px] opacity-10">
                  <Icons.Heart />
                </div>
              </div>
            </section>

            <section className="px-6 grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('meds')}
                className="bg-white p-6 rounded-[40px] shadow-sm flex flex-col items-center justify-center gap-2 text-center border-b-8 border-emerald-500 hover:bg-slate-50 transition active:translate-y-1"
              >
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                  <Icons.Medkit />
                </div>
                <span className="font-bold text-slate-700 text-lg">{t.myPills}</span>
                <span className="text-xs text-slate-400">{t.nextDue}: 09:00 AM</span>
              </button>
              <button 
                onClick={() => setActiveTab('games')}
                className="bg-white p-6 rounded-[40px] shadow-sm flex flex-col items-center justify-center gap-2 text-center border-b-8 border-amber-500 hover:bg-slate-50 transition active:translate-y-1"
              >
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                  <Icons.Puzzle />
                </div>
                <span className="font-bold text-slate-700 text-lg">{t.funGames}</span>
                <span className="text-xs text-slate-400">{t.brainSharp}</span>
              </button>
            </section>

            <section className="px-6">
               <div className="bg-white rounded-[40px] p-6 shadow-sm border-b-4 border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">{t.healthCheck}</h2>
                  <div className="flex justify-between items-center py-4 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                        <Icons.Heart />
                      </div>
                      <span className="font-semibold text-slate-700 text-lg">{t.heartBeat}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800">72 <span className="text-sm font-normal text-slate-400">BPM</span></span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                        <Icons.Bolt />
                      </div>
                      <span className="font-semibold text-slate-700 text-lg">{t.walkingSteps}</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800">4,120</span>
                  </div>
               </div>
            </section>
          </div>
        );
      case 'meds':
        return <MedicationTracker meds={meds} onAction={handleMedAction} />;
      case 'vitals':
        return (
          <div className="px-6 pt-8 pb-24 space-y-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-4 text-center">{t.records}</h1>
            <HealthCharts data={vitals.heartRate} label={t.heartBeat} color="#ef4444" />
            <HealthCharts data={vitals.bloodPressure} label="Blood Pressure" color="#3b82f6" />
            <HealthCharts data={vitals.bloodSugar} label="Sugar Level" color="#10b981" />
            <HealthCharts data={vitals.steps} label={t.walkingSteps} color="#f59e0b" />
          </div>
        );
      case 'games':
        return (
          <div className="px-6 pt-8 pb-24 text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">{t.funGames}</h1>
            <BrainGameMemory />
          </div>
        );
      case 'profile':
        return <ProfileSettings profile={profile} onUpdate={setProfile} onBack={() => setActiveTab('home')} />;
      case 'sos':
        return <SOSPanel />;
      default:
        return <div>Under Construction</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-slate-50">
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Language Quick Toggle */}
      {activeTab === 'home' && (
        <button 
          onClick={() => setProfile(p => ({ ...p, language: p.language === 'en' ? 'hi' : 'en' }))}
          className="fixed bottom-32 right-6 w-14 h-14 bg-white border-2 border-slate-100 rounded-2xl shadow-lg flex items-center justify-center text-blue-600 font-black text-xl z-50 transition active:scale-95"
        >
          {profile.language === 'en' ? 'अ' : 'A'}
        </button>
      )}

      {/* SOS Floating Button */}
      {activeTab !== 'sos' && activeTab !== 'profile' && (
        <button 
          onClick={() => setActiveTab('sos')}
          className="fixed bottom-24 right-6 w-24 h-24 bg-red-600 rounded-full shadow-2xl flex flex-col items-center justify-center text-white animate-pulse z-50 transition transform hover:scale-110 active:scale-95 border-4 border-red-800"
        >
          <span className="font-black text-xl leading-none">SOS</span>
          <span className="font-bold text-[10px] uppercase mt-1">{t.help}</span>
        </button>
      )}

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 flex justify-around items-center py-4 px-2 z-40 rounded-t-[40px] shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.3)]">
        <NavButton active={activeTab === 'home'} icon={<Icons.Home />} label={t.home} onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'meds'} icon={<Icons.Medkit />} label={t.pills} onClick={() => setActiveTab('meds')} />
        <NavButton active={activeTab === 'vitals'} icon={<Icons.Heart />} label={t.vitals} onClick={() => setActiveTab('vitals')} />
        <NavButton active={activeTab === 'games'} icon={<Icons.Puzzle />} label={t.games} onClick={() => setActiveTab('games')} />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center transition-all ${active ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`${active ? 'bg-blue-50 p-2 rounded-2xl' : ''}`}>
      {icon}
    </div>
    <span className="text-[14px] font-bold mt-1 tracking-tight">{label}</span>
  </button>
);

export default App;
