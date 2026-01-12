
import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, Label } from '../components/UI';
import { UserProfile, SearchResult, GroundingSource } from '../types';
import { geminiService } from '../services/gemini';
import { FIELDS } from '../constants';

interface JobSearchProps {
  user: UserProfile;
}

const JobSearch: React.FC<JobSearchProps> = ({ user }) => {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState(user.field);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const results = await geminiService.matchJobs({
        ...user,
        field: selectedField,
        preferences: searchTerm
      });
      setSearchResult(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Smart Job Matcher</h1>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium">
          Our AI searches LinkedIn, Welcome to the Jungle, and recruiter posts in real-time to find your perfect match.
        </p>
      </div>

      <div className="bg-[#FEF9E7] p-8 rounded-3xl shadow-md mb-12 border border-yellow-200/50 flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full">
          <Label>Search keywords</Label>
          <Input 
            placeholder="e.g. Bilingual Developer, Luxury Internship, CDI Paris..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Label>Field of interest</Label>
          <Select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
            {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
          </Select>
        </div>
        <Button onClick={fetchJobs} disabled={loading} className="w-full md:w-auto h-[46px]">
          {loading ? 'Searching Live Web...' : 'Find New Jobs'}
        </Button>
      </div>

      {loading ? (
        <div className="space-y-8 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
          <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Search Content */}
          <div className="lg:col-span-2 space-y-8">
            {searchResult ? (
              <Card className="prose prose-sm max-w-none border-t-8 border-t-charcoal shadow-xl">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Live Search Active</span>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Grounding enabled</span>
                </div>
                <div className="whitespace-pre-wrap text-charcoal font-medium leading-relaxed">
                  {searchResult.text}
                </div>
              </Card>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest border-4 border-dashed rounded-3xl">
                Enter a search to begin
              </div>
            )}
          </div>

          {/* Sidebar: Sources */}
          <div className="space-y-8">
            <Card className="sticky top-24">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🔗</span> Verified Sources
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-medium">Click to view original posts on LinkedIn, job boards, or recruiter portals.</p>
              
              <div className="space-y-3">
                {searchResult?.sources && searchResult.sources.length > 0 ? (
                  searchResult.sources.map((source, index) => (
                    <a 
                      key={index}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-off-white rounded-xl border border-gray-100 hover:border-charcoal hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-charcoal group-hover:underline line-clamp-2">
                          {source.title}
                        </span>
                        <svg className="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-2 block overflow-hidden text-ellipsis whitespace-nowrap">
                        {new URL(source.uri).hostname}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-300 font-bold uppercase text-[10px] tracking-widest">
                    {loading ? 'Identifying Sources...' : 'No sources to display'}
                  </div>
                )}
              </div>

              {searchResult && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button variant="outline" className="w-full text-xs py-2" onClick={() => window.print()}>
                    Export Search Report
                  </Button>
                </div>
              )}
            </Card>

            <Card className="bg-pastel-yellow border-none shadow-sm">
              <h4 className="font-bold text-sm mb-2 italic font-serif-italic">Pro Tip</h4>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                Recruiters on LinkedIn often post "hidden" roles. Use specific keywords like <span className="font-bold">"Hiring now"</span> or <span className="font-bold">"Join the team"</span> for better results.
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
