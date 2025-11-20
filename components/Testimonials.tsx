
import React from 'react';
import { MessageCircle } from 'lucide-react';
import cvData from '../cv-data';

const Testimonials: React.FC = () => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-center mb-6 text-slate-900 dark:text-white flex items-center justify-center">
        <MessageCircle className="h-6 w-6 mr-2 text-primary-500" />
        Dicono di me
      </h3>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {cvData.testimonials.map((msg, index) => (
          <div key={index} className="flex">
            <a 
              href={msg.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group w-full relative"
            >
                <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none p-6 shadow-md border border-slate-100 dark:border-slate-700 group-hover:shadow-lg transition-all duration-200 relative z-10 h-full flex flex-col">
                    {/* Header Bubble */}
                    <div className="flex justify-between items-baseline mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
                        <span className="font-bold text-primary-600 dark:text-primary-400 text-base">
                            {msg.name}
                        </span>
                        <span className="text-xs text-slate-400 ml-2 shrink-0">
                            {msg.date}
                        </span>
                    </div>
                    
                    {/* Body */}
                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line flex-grow">
                        {msg.text}
                    </p>
                    
                    {/* Footer Bubble */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                        <p className="font-semibold text-slate-500 dark:text-slate-400">{msg.role}</p>
                        <p className="italic text-slate-400 dark:text-slate-500 mt-1">{msg.relation}</p>
                    </div>
                </div>
                
                {/* Triangle Tail effect for CSS-only chat bubble */}
                <div className="absolute top-0 left-0 -ml-2 w-4 h-4 bg-white dark:bg-slate-800 border-l border-b border-slate-100 dark:border-slate-700 transform rotate-45 z-0 mt-6"></div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
