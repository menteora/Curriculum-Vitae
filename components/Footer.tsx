import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Profilo Professionale.</p>
        <p>Realizzato con React, TypeScript e Tailwind CSS.</p>
        <p>Questo sito non utilizza cookie di tracciamento.</p>
      </div>
    </footer>
  );
};

export default Footer;