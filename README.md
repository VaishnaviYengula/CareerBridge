# CareerBridge

CareerBridge is an AI powered web application built to help international students in France find internships and jobs in the French and EU markets. It brings together job discovery, CV optimization, interview preparation, and visa aware guidance into one focused platform.

This project is my first ever app. I built it through vibe coding, inspired by my own experience navigating unfamiliar recruitment systems, administrative complexity, and hidden job markets as an international student.

## Why CareerBridge

For international students, job hunting is not only about qualifications. It involves visa constraints, language expectations, cultural norms, and understanding how hiring actually works in a new country. CareerBridge exists to reduce this friction and turn confusion into clarity.

## Core Features

### Smart Job Matcher
- AI scans and filters job and internship listings from French and EU platforms
- Includes recruiter posts and niche job boards
- Filters by visa friendliness and language requirements
- Displays verified source links for transparency

### CV and Cover Letter Tailor
- Upload a CV for AI driven analysis
- Reformat CV to French professional standards
- Receive a score, detailed suggestions, and cultural tips
- Generate tailored cover letters from selected or pasted job descriptions
- Save analysis results locally for reuse

### AI Interview Coach
- Interactive mock interviews with common French and EU questions
- Feedback on clarity, structure, tone, and cultural nuance
- Guidance on confidently discussing visa status and work authorization

### Dashboard
- Central view of matched jobs and saved opportunities
- Application tracking and next steps
- CV and interview progress overview
- Weekly networking suggestions and visa reminders

## User Flow

1. User starts with a blank profile
2. App prompts the user to fill in personal and professional details
3. Profile is stored locally and acts as a lightweight login
4. Once completed, all AI features become accessible via the dashboard
5. Experience is fully responsive across desktop and mobile

## Design System

- Strategic, approachable, and trustworthy visual identity
- Warm pastel yellow primary background
- Off white and light cream secondary sections
- Charcoal and muted gray typography for readability
- Rounded CTAs and minimal navigation
- Serif italic accents paired with a clean sans serif font
- Human centered professional imagery

## Tech Stack

- Frontend: React with TypeScript
- Platform: Web based, mobile responsive
- AI: Google Gemini models for generation and analysis
- Storage: localStorage for profile data and CV analysis
- Security: API keys managed via environment variables only

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm or yarn
- Gemini API key for AI features

### Installation

```bash
git clone https://github.com/your-username/careerbridge.git
cd careerbridge
npm install
