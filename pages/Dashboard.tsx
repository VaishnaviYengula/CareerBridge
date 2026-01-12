import React from 'react';
import { Card, Button } from '../components/UI';
import { Page, UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  onNavigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-charcoal tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-600 font-medium mt-1">Here's the latest update for your {user.field} search.</p>
        </div>
        <div className="bg-[#FEF9E7] px-6 py-3 rounded-2xl border-2 border-yellow-200/50 shadow-sm">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Active Visa</p>
          <p className="font-bold text-charcoal">{user.visaType}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard label="Applications" value="12" change="+2 this week" />
            <StatCard label="Interviews" value="3" change="Next tomorrow" />
            <StatCard label="AI Matches" value="45" change="15 new today" />
          </div>

          <Card className="border-l-8 border-l-charcoal">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold tracking-tight">Personalized Roadmap</h3>
              <Button variant="outline" size="sm" onClick={() => onNavigate(Page.JobSearch)}>Explore Jobs</Button>
            </div>
            <div className="space-y-6">
              <SuggestionItem 
                title="Polish CV for French Luxury sector"
                desc="French luxury recruiters value precise formatting and bilingual nuances. Let's optimize yours."
                action="Optimize CV"
                onAction={() => onNavigate(Page.CVTailor)}
              />
              <SuggestionItem 
                title="HEC Alumni Tech Mixer"
                desc="Exclusive networking for international graduates. Station F, Paris. Friday at 18:00."
                action="RSVP Event"
              />
              <SuggestionItem 
                title="Visa Rule Update (Oct 2024)"
                desc="Clarification on APS extension timelines for non-EU Master graduates."
                action="Check Guide"
              />
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-charcoal text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6">Interview Prep</h3>
            <div className="mb-8">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 opacity-80">
                <span>Performance Score</span>
                <span>72%</span>
              </div>
              <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: '72%' }}></div>
              </div>
            </div>
            <Button variant="secondary" className="w-full py-3.5" onClick={() => onNavigate(Page.InterviewCoach)}>Start Practice Session</Button>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-6 text-charcoal">Checklist</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-sm font-bold text-gray-800">
                <div className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                CV Optimized
              </li>
              <li className="flex items-center text-sm font-bold text-gray-800">
                <div className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                Preferences Set
              </li>
              <li className="flex items-center text-sm font-bold text-gray-400">
                <div className="border-2 border-gray-200 w-6 h-6 rounded-full mr-3"></div>
                First Mock Interview
              </li>
              <li className="flex items-center text-sm font-bold text-gray-400">
                <div className="border-2 border-gray-200 w-6 h-6 rounded-full mr-3"></div>
                Sync Tracker
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, change: string }> = ({ label, value, change }) => (
  <Card className="flex flex-col border-b-4 border-b-pastel-yellow hover:border-b-charcoal transition-colors duration-300">
    <span className="text-gray-500 text-xs font-black uppercase tracking-widest">{label}</span>
    <span className="text-4xl font-bold my-2 text-charcoal">{value}</span>
    <span className="text-xs text-green-700 font-black">{change}</span>
  </Card>
);

const SuggestionItem: React.FC<{ title: string, desc: string, action: string, onAction?: () => void }> = ({ title, desc, action, onAction }) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-[#F9F7F2] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-200 group">
    <div className="mr-6 max-w-lg">
      <h4 className="font-bold text-charcoal text-base mb-1 group-hover:text-black transition-colors">{title}</h4>
      <p className="text-sm text-gray-600 font-medium line-clamp-2 leading-relaxed">{desc}</p>
    </div>
    <Button variant="outline" size="sm" onClick={onAction} className="whitespace-nowrap px-6 py-2">
      {action}
    </Button>
  </div>
);

export default Dashboard;