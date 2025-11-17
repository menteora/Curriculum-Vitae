import React, { useState, useEffect } from 'react';
import { Sun, Moon, Target } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={`sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg z-10 shadow-md transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-primary-500" />
            <div className="ml-3">
              <span className="text-xl font-bold text-slate-900 dark:text-white">Profilo Professionale di Luca D'Amico</span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Cambia tema"
            >
              {theme === Theme.LIGHT ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
