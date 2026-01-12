
import React from 'react';
import { Page } from '../types';
import { Button } from '../components/UI';

interface HomeProps {
  onStart: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-pastel-yellow px-4 py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-charcoal">
              Unlock your <br />
              <span className="font-serif-italic font-normal">career strategy</span> <br />
              in France.
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              Tailored support for international students. We help you navigate the French job market with <span className="font-serif-italic">confidence</span> and clarity.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => onStart(Page.Dashboard)}>Get Started</Button>
              <Button variant="outline" onClick={() => onStart(Page.JobSearch)}>Explore Jobs</Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2">
              <img src="https://picsum.photos/800/600?random=1" alt="Professional in Paris" className="w-full object-cover h-[400px]" />
            </div>
            <div className="absolute -bottom-6 -left-6 z-0 bg-white p-6 rounded-xl shadow-lg -rotate-2 hidden md:block">
              <p className="font-serif-italic text-2xl text-charcoal">"Strategic and human-centered."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How CareerBridge supports you</h2>
            <div className="h-1 w-20 bg-charcoal mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎯"
              title="Smart Job Matching"
              description="Our AI filters thousands of French listings to find those truly open to international talent and specific visa types."
            />
            <FeatureCard 
              icon="✍️"
              title="CV & Cover Letter Tailoring"
              description="Instantly reformat your profile to match French recruitment standards and generate tailored motivation letters."
            />
            <FeatureCard 
              icon="🗣️"
              title="AI Interview Coach"
              description="Practice with a specialized AI coach that understands the cultural nuances of French workplace etiquette."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl border border-gray-100 hover:border-pastel-yellow transition-all hover:shadow-lg bg-off-white">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default Home;
