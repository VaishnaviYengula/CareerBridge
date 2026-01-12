import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const base = "inline-flex items-center justify-center rounded-full transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed tracking-tight";
  
  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const variants = {
    primary: "bg-[#121212] text-white hover:bg-black shadow-md",
    secondary: "bg-white text-[#121212] hover:bg-gray-50 border border-gray-300 shadow-sm",
    outline: "bg-transparent border-2 border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white"
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-200/50 ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props} 
    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-transparent bg-white text-charcoal placeholder:text-gray-500 transition-all text-sm font-medium" 
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => (
  <div className="relative w-full">
    <select 
      {...props} 
      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#121212] focus:border-transparent bg-white text-charcoal transition-all appearance-none text-sm font-medium"
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-600">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
);

export const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <label className={`block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5 ${className}`}>
    {children}
  </label>
);
