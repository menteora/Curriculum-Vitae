import React from 'react';
import { PlayCircle, Zap, CheckCircle, ArrowUpCircle, Briefcase, Check, LucideProps } from 'lucide-react';
import Card from './ui/Card';
import cvData from '../cv-data';

const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  PlayCircle,
  Zap,
  CheckCircle,
  ArrowUpCircle,
};

const HowMethod: React.FC = () => {
  const { title, intro, pdca } = cvData.howMethod;

  return (
    <section id="how-method">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center">
          <Briefcase className="h-8 w-8 mr-3 text-primary-500" />
          {title}
        </h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {intro}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pdca.map((quad) => {
          const IconComponent = iconComponents[quad.icon];
          return (
            <Card key={quad.title} className={`border-t-4 ${quad.color}`}>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {IconComponent && <IconComponent className={`h-8 w-8 mr-3 ${quad.color.replace('border-', 'text-')}`} />}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{quad.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{quad.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {quad.items.map((item, index) => (
                    <li key={index} className="flex items-start text-slate-600 dark:text-slate-300">
                      <Check className="h-4 w-4 mr-2.5 mt-1 text-primary-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  );
};

export default HowMethod;