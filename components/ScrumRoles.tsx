import React from 'react';
import { Briefcase, LucideProps, Shield, TrendingUp, Code, Users, Smile, Handshake } from 'lucide-react';
import Card from './ui/Card';
import cvData from '../cv-data';

const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  Shield, TrendingUp, Code, Users, Smile, Handshake
};

const WhatValue: React.FC = () => {
  const { title, intro, areas } = cvData.whatValue;

  return (
    <section id="what-value">
       <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center">
          <Briefcase className="h-8 w-8 mr-3 text-primary-500" />
          {title}
        </h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto italic">
          {intro}
        </p>
      </div>

      <Card>
        <div className="p-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => {
               const IconComponent = iconComponents[area.icon];
               return (
                <li key={area.name} className="flex items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  {IconComponent && <IconComponent className="h-6 w-6 mr-4 text-primary-500 flex-shrink-0" />}
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{area.name}</span>
                </li>
               )
            })}
          </ul>
        </div>
      </Card>
    </section>
  );
};

export default WhatValue;