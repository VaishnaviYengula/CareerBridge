
import React from 'react';
import { Card, Input, Select, Button, Label } from '../components/UI';
import { UserProfile } from '../types';
import { FIELDS, VISA_TYPES } from '../constants';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  onComplete?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onComplete }) => {
  const handleChange = (field: keyof UserProfile, value: string) => {
    onUpdate({ ...user, [field]: value });
  };

  const isFormValid = user.name.trim() !== '' && user.field !== '' && user.visaType !== '';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 pt-24">
      <h1 className="text-4xl font-bold mb-4 text-center tracking-tight">Your Profile</h1>
      <p className="text-center text-gray-500 mb-10 max-w-md mx-auto">Fill in your details to unlock AI-powered job matching and interview coaching.</p>
      
      <div className="space-y-10">
        <Card className="border-t-4 border-t-charcoal">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            <span className="mr-2">👤</span> Basic Information
          </h3>
          <div className="grid gap-8">
            <div>
              <Label>Full Name</Label>
              <Input 
                placeholder="How should we address you?"
                value={user.name} 
                onChange={(e) => handleChange('name', e.target.value)} 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Field of Study</Label>
                <Select value={user.field} onChange={(e) => handleChange('field', e.target.value)}>
                  <option value="">Select your field...</option>
                  {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                </Select>
              </div>
              <div>
                <Label>Current Visa Status</Label>
                <Select value={user.visaType} onChange={(e) => handleChange('visaType', e.target.value)}>
                  <option value="">Select your visa status...</option>
                  {VISA_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </Select>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-t-4 border-t-pastel-yellow">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            <span className="mr-2">💼</span> Job Preferences
          </h3>
          <div className="space-y-8">
            <div>
              <Label>French Language Level</Label>
              <Select value={user.languageLevel} onChange={(e) => handleChange('languageLevel', e.target.value)}>
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Native / Fluent</option>
              </Select>
            </div>
            <div>
              <Label>Job Goals & Location Preferences</Label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-transparent bg-white h-36 text-sm font-medium transition-all"
                placeholder="e.g. Seeking internships in Paris or Lyon for Summer 2024..."
                value={user.preferences}
                onChange={(e) => handleChange('preferences', e.target.value)}
              />
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="flex-1 py-4 text-base" 
            size="lg" 
            disabled={!isFormValid}
            onClick={onComplete}
          >
            Save & Enter Dashboard
          </Button>
          <Button variant="outline" className="flex-1 py-4 text-base" size="lg">Export Profile (PDF)</Button>
        </div>
        
        {!isFormValid && (
          <p className="text-center text-xs text-red-500 font-bold uppercase tracking-widest">Please fill in your name, field, and visa type to continue.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
