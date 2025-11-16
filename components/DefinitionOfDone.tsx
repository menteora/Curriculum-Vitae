import React from 'react';
import { Check, ClipboardCheck } from 'lucide-react';
import Card from './ui/Card';
import cvData from '../cv-data';

const HowPrinciples: React.FC = () => {
  const { definitionOfValue } = cvData.howPrinciples;
  return (
    <section id="how-principles">
       <div className="max-w-3xl mx-auto">
        <Card>
            <div className="p-8 flex flex-col">
                <h4 className="text-xl font-bold text-center text-slate-900 dark:text-white flex items-center justify-center mb-2">
                    <ClipboardCheck className="h-6 w-6 mr-2 text-primary-500"/>
                    {definitionOfValue.title}
                </h4>
                <p className="text-center text-slate-500 dark:text-slate-400 mb-6 italic">{definitionOfValue.subtitle}</p>
                <ul className="space-y-4">
                {definitionOfValue.items.map((item) => (
                <li key={item} className="flex items-start text-slate-700 dark:text-slate-200">
                    <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mr-4">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-300 flex-shrink-0" />
                    </div>
                    <span>{item}</span>
                </li>
                ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HowPrinciples;