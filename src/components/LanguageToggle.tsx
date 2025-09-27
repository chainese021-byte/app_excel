import React from 'react';
import { Globe } from 'lucide-react';
import { Language, languages } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onLanguageChange
}) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border p-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <select
        value={currentLang.code}
        onChange={(e) => {
          const lang = languages.find(l => l.code === e.target.value);
          if (lang) onLanguageChange(lang);
        }}
        className="border-none outline-none bg-transparent text-sm font-medium"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};