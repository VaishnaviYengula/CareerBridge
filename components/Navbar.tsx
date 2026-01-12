
import React from 'react';
import { Page } from '../types';
import { LOGO_ICON } from '../constants';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { label: 'Home', page: Page.Home },
    { label: 'Dashboard', page: Page.Dashboard },
    { label: 'Find Jobs', page: Page.JobSearch },
    { label: 'CV Tailor', page: Page.CVTailor },
    { label: 'Interview Coach', page: Page.InterviewCoach },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => onNavigate(Page.Home)}
          >
            {LOGO_ICON}
            <span className="text-xl font-bold tracking-tight text-charcoal">careerbridge</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors hover:text-charcoal ${
                  currentPage === item.page ? 'text-charcoal' : 'text-gray-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
             <button 
              onClick={() => onNavigate(Page.Profile)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
