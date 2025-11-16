import React from 'react';
import { BrainCircuit, Ear, Share2, Handshake, Lightbulb, ShieldCheck, Wind, Search, TrendingUp, HeartHandshake, LucideProps } from 'lucide-react';
import Card from './ui/Card';
import cvData from '../cv-data';

const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  BrainCircuit,
  Ear,
  Share2,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Wind,
  Search,
  TrendingUp,
  HeartHandshake,
};

const HowCompetencies: React.FC = () => {
  const { title, items } = cvData.howCompetencies;
  return (
    <section id="how-competencies">
      <h3 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((quality) => {
          const IconComponent = iconComponents[quality.icon];
          return (
            <Card key={quality.name} className="text-center">
              <div className="p-6 flex flex-col items-center justify-center h-full">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-4">
                  {IconComponent && <IconComponent className="h-8 w-8 text-primary-600 dark:text-primary-300" />}
                </div>
                <h3 className="text-md font-semibold text-slate-900 dark:text-white">{quality.name}</h3>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  );
};

export default HowCompetencies;