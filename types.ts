
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  color: string;
  status: 'pending' | 'taken' | 'skipped';
}

export interface VitalReading {
  date: string;
  value: number;
}

export interface VitalsData {
  heartRate: VitalReading[];
  bloodPressure: VitalReading[];
  bloodSugar: VitalReading[];
  steps: VitalReading[];
}

export interface UserProfile {
  name: string;
  age: string;
  phone: string;
  language: 'en' | 'hi';
}

export type Screen = 'home' | 'meds' | 'vitals' | 'games' | 'exercise' | 'sos' | 'profile';
