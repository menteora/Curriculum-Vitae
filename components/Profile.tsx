import React from 'react';
import { Mail, Linkedin, Github, Building, LucideProps } from 'lucide-react';
import Card from './ui/Card';
import cvData from '../cv-data.ts';

const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  Mail,
  Linkedin,
  Github,
  Building,
};

const Profile: React.FC = () => {
  const { name, title, location, avatarUrl, contacts, finalFormula } = cvData.profile;

  return (
    <section id="profile">
      <Card>
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-700"></div>
          <img
            src={avatarUrl}
            alt={name}
            className="absolute left-8 top-16 w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"
          />
        </div>
        <div className="pt-20 p-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">{name}</h1>
          <p className="mt-1 text-lg text-primary-600 dark:text-primary-400 font-medium">{title}</p>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{location}</p>
          {finalFormula && (
            <blockquote className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 border-l-4 border-primary-500 italic text-slate-600 dark:text-slate-300">
              <p>{finalFormula}</p>
            </blockquote>
          )}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {contacts.map(contact => {
              const IconComponent = iconComponents[contact.icon as keyof typeof iconComponents];
              const isExternalLink = contact.url.startsWith('http');
              return (
                <a 
                  key={contact.type} 
                  href={contact.url} 
                  target={isExternalLink ? "_blank" : undefined} 
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                  className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {IconComponent && <IconComponent className="h-4 w-4 mr-2" />} {contact.value}
                </a>
              )
            })}
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Profile;