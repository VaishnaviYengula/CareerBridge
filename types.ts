
export interface UserProfile {
  name: string;
  field: string;
  skills: string[];
  visaType: string;
  languageLevel: string;
  preferences: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: GroundingSource[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  visaFriendly: boolean;
  matchScore: number;
  matchReason: string;
  salary?: string;
  sourceUrl?: string;
}

export interface CVAnalysis {
  formattingScore: number;
  contentSuggestions: string[];
  culturalTips: string[];
  reformattedCV: string;
}

export interface InterviewFeedback {
  questions: string[];
  currentQuestionIndex: number;
  transcript: { speaker: 'AI' | 'User', text: string }[];
  feedback?: {
    strengths: string[];
    weaknesses: string[];
    culturalNuance: string;
  };
}

export enum Page {
  Home = 'home',
  Dashboard = 'dashboard',
  JobSearch = 'jobs',
  CVTailor = 'cv',
  InterviewCoach = 'interview',
  Profile = 'profile'
}
