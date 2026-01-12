
import React, { useState } from 'react';
import { Page, UserProfile } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import JobSearch from './pages/JobSearch';
import CVTailor from './pages/CVTailor';
import InterviewCoach from './pages/InterviewCoach';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [user, setUser] = useState<UserProfile>({
    name: 'Sarah Chen',
    field: 'Software Engineering',
    skills: ['React', 'TypeScript', 'Node.js'],
    visaType: 'VLS-TS Student',
    languageLevel: 'B2',
    preferences: 'Seeking 6-month internship in Paris starting March 2024.'
  });

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home onStart={setCurrentPage} />;
      case Page.Dashboard:
        return <Dashboard user={user} onNavigate={setCurrentPage} />;
      case Page.JobSearch:
        return <JobSearch user={user} />;
      case Page.CVTailor:
        return <CVTailor />;
      case Page.InterviewCoach:
        return <InterviewCoach user={user} />;
      case Page.Profile:
        return <Profile user={user} onUpdate={setUser} />;
      default:
        return <Home onStart={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-charcoal"><path d="M12 2L14.5 9.5H22L16 14.5L18.5 22L12 17.5L5.5 22L8 14.5L2 9.5H9.5L12 2Z" fill="currentColor"/></svg>
                <span className="text-xl font-bold tracking-tight">careerbridge</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">Empowering international students in France to build world-class careers.</p>
            </div>
            <div className="flex space-x-8 text-sm text-gray-500">
              <a href="#" className="hover:text-charcoal transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-charcoal transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-charcoal transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} CareerBridge. All rights reserved. Made for the French/EU market.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
