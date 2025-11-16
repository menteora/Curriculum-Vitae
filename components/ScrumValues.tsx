import React from 'react';
import { Pin } from 'lucide-react';
import Card from './ui/Card';
import cvData from '../cv-data';

const WhereIApplyIt: React.FC = () => {
  const { title, items } = cvData.whereIApplyIt;
  return (
    <section id="where-i-apply-it">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white flex items-center justify-center">
        <Pin className="h-8 w-8 mr-3 text-primary-500" />
        {title}
      </h2>
      <Card>
        <div className="p-8">
            <div className="flex flex-wrap justify-center gap-3">
            {items.map((item) => (
                <span key={item} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-md font-medium px-4 py-2 rounded-full">
                {item}
                </span>
            ))}
            </div>
        </div>
      </Card>
    </section>
  );
};

export default WhereIApplyIt;