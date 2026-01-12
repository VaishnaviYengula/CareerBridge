
import React, { useState } from 'react';
import { Card, Button, Label } from '../components/UI';
import { geminiService } from '../services/gemini';
import { CVAnalysis } from '../types';

const CVTailor: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  // Cover Letter state
  const [jobDescription, setJobDescription] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [letterLoading, setLetterLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!cvText) return;
    setLoading(true);
    setSaveStatus('idle');
    setGeneratedLetter('');
    try {
      const result = await geminiService.analyzeCV(cvText);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (analysis) {
      const storageKey = 'careerbridge_saved_analysis';
      localStorage.setItem(storageKey, JSON.stringify({
        ...analysis,
        savedAt: new Date().toISOString()
      }));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleGenerateLetter = async () => {
    if (!analysis || !jobDescription) return;
    setLetterLoading(true);
    try {
      const letter = await geminiService.generateCoverLetter(cvText, analysis, jobDescription);
      setGeneratedLetter(letter);
    } catch (e) {
      console.error(e);
    } finally {
      setLetterLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">CV & Cover Letter Tailor</h1>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              Adapt your profile to French professional standards. Our AI checks for clarity, cultural fit, and keyword optimization.
            </p>
          </div>

          <Card className="p-0 overflow-hidden border-2 border-charcoal/10 shadow-lg">
            <div className="bg-[#FEF9E7] p-5 border-b-2 border-yellow-200/50 flex justify-between items-center">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-700">CV Source Text</span>
              <Button size="sm" variant="secondary" onClick={() => setCvText('')} className="bg-white/50">Reset</Button>
            </div>
            <textarea 
              className="w-full h-[450px] p-8 focus:outline-none resize-none text-sm font-medium leading-relaxed text-charcoal bg-white"
              placeholder="Paste your resume/CV content here for analysis..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </Card>
          
          <Button 
            className="w-full py-5 text-lg shadow-xl" 
            disabled={loading || !cvText} 
            onClick={handleAnalyze}
            size="lg"
          >
            {loading ? 'Analyzing Profile...' : 'Optimize for French Market'}
          </Button>
        </div>

        <div>
          {analysis ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-right duration-500">
              <Card className="border-t-8 border-t-charcoal shadow-2xl">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight">Recruiter Analysis</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSave}
                      className={saveStatus === 'saved' ? 'border-green-500 text-green-600' : ''}
                    >
                      {saveStatus === 'saved' ? '✓ Saved to Storage' : '💾 Save Analysis'}
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-black text-charcoal leading-none">{analysis.formattingScore}%</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Market Fit</div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <Label className="text-gray-500 font-black mb-4">Strategic Improvements</Label>
                    <ul className="space-y-4">
                      {analysis.contentSuggestions.map((s, i) => (
                        <li key={i} className="flex items-start text-sm font-semibold text-charcoal">
                          <span className="bg-charcoal text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] mr-3 mt-0.5 flex-shrink-0">{i+1}</span> 
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FEF9E7] p-6 rounded-2xl border-2 border-yellow-200/50 shadow-inner">
                    <Label className="text-charcoal font-black mb-4">Cultural Etiquette Tips</Label>
                    <ul className="space-y-3">
                      {analysis.culturalTips.map((t, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-800 italic font-bold">
                          <span className="mr-3 text-lg leading-none">🇫🇷</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Cover Letter Section */}
              <Card className="border-t-8 border-t-yellow-400 shadow-xl">
                <h3 className="text-xl font-bold mb-4 tracking-tight">Generate Tailored Cover Letter</h3>
                <p className="text-sm text-gray-500 mb-6">Paste the job description you're applying for to generate a custom motivation letter.</p>
                
                <div className="space-y-4 mb-6">
                  <Label>Job Description</Label>
                  <textarea 
                    className="w-full h-32 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-charcoal bg-gray-50 text-sm font-medium transition-all"
                    placeholder="Paste job title, company, and key requirements here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <Button 
                    className="w-full py-3" 
                    variant="primary" 
                    onClick={handleGenerateLetter}
                    disabled={letterLoading || !jobDescription}
                  >
                    {letterLoading ? 'Crafting Letter...' : 'Generate Lettre de Motivation'}
                  </Button>
                </div>

                {generatedLetter && (
                  <div className="animate-in slide-in-from-top duration-500">
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-charcoal m-0">Generated Letter</Label>
                      <Button variant="outline" size="sm" onClick={() => {
                        navigator.clipboard.writeText(generatedLetter);
                      }}>Copy Letter</Button>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap shadow-inner font-medium">
                      {generatedLetter}
                    </div>
                  </div>
                )}
              </Card>

              <Card className="shadow-lg border-2 border-charcoal/5">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold tracking-tight">Reformatted CV Content</h3>
                   <Button variant="outline" size="sm" onClick={() => {
                     navigator.clipboard.writeText(analysis.reformattedCV);
                   }}>Copy Markdown</Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl font-mono text-xs overflow-auto max-h-[350px] border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">{analysis.reformattedCV}</pre>
                </div>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-16 border-4 border-dashed border-gray-200 rounded-[3rem] bg-gray-50/50">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 text-5xl shadow-xl animate-bounce duration-1000">✨</div>
              <h3 className="text-2xl font-black text-gray-300 uppercase tracking-widest mb-4">Ready to Optimize</h3>
              <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed uppercase text-[10px] tracking-[0.2em]">
                Submit your profile on the left to unlock deep cultural insights and formatting magic.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVTailor;
