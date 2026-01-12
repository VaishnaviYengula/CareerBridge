
import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input } from '../components/UI';
import { geminiService } from '../services/gemini';
import { UserProfile, InterviewFeedback } from '../types';

interface InterviewCoachProps {
  user: UserProfile;
}

const InterviewCoach: React.FC<InterviewCoachProps> = ({ user }) => {
  const [messages, setMessages] = useState<{ speaker: 'AI' | 'User', text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<InterviewFeedback['feedback']>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = async () => {
    setLoading(true);
    setFeedback(undefined);
    const initialQuestion = await geminiService.generateInterviewQuestion(user, []);
    setMessages([{ speaker: 'AI', text: initialQuestion }]);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput || loading) return;

    const newMessages = [...messages, { speaker: 'User' as const, text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    if (newMessages.filter(m => m.speaker === 'User').length >= 4) {
      // Get feedback after 4 rounds
      const feedbackResult = await geminiService.getInterviewFeedback(newMessages);
      setFeedback(feedbackResult);
      setMessages(prev => [...prev, { speaker: 'AI', text: "Thank you for these responses. I've prepared a feedback report for you above." }]);
    } else {
      const nextQuestion = await geminiService.generateInterviewQuestion(user, newMessages);
      setMessages(prev => [...prev, { speaker: 'AI', text: nextQuestion }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">AI Interview Coach</h1>
        <p className="text-gray-500">Practice behavioral and technical questions tailored to the French job market.</p>
      </div>

      {feedback && (
        <Card className="mb-8 border-charcoal animate-in zoom-in duration-300">
          <h3 className="text-xl font-bold mb-6">Your Performance Feedback</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-green-600 tracking-widest">Strengths</h4>
              <ul className="space-y-2 text-sm">
                {feedback.strengths.map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-red-600 tracking-widest">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                {feedback.weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase text-charcoal tracking-widest mb-2">Cultural Nuance Advice</h4>
            <p className="text-sm text-gray-600 italic">"{feedback.culturalNuance}"</p>
          </div>
          <div className="mt-6">
            <Button className="w-full" variant="outline" onClick={startInterview}>Restart New Session</Button>
          </div>
        </Card>
      )}

      {messages.length === 0 ? (
        <div className="text-center p-20 bg-pastel-yellow rounded-3xl border border-yellow-200">
          <div className="text-6xl mb-6">🎙️</div>
          <h2 className="text-2xl font-bold mb-2">Ready to practice?</h2>
          <p className="text-gray-600 mb-8 max-w-sm mx-auto">I'll ask you 4 questions specific to your field and visa situation.</p>
          <Button onClick={startInterview} disabled={loading} className="px-12 py-4">Start Mock Interview</Button>
        </div>
      ) : (
        <Card className="flex flex-col h-[600px] p-0 overflow-hidden border-2 border-charcoal">
          <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  m.speaker === 'AI' 
                  ? 'bg-off-white text-charcoal rounded-tl-none border border-gray-100' 
                  : 'bg-charcoal text-white rounded-tr-none'
                }`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 bg-off-white border-t border-gray-200 flex gap-2">
            <Input 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your response..."
              disabled={loading || !!feedback}
            />
            <Button type="submit" disabled={loading || !userInput || !!feedback}>Send</Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default InterviewCoach;
