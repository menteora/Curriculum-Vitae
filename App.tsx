import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Profile from './components/Profile';
import NavigationMenu from './components/NavigationMenu';
import WhyMission from './components/ProductGoal';
import WhatValue from './components/ScrumRoles';
import WhatResults from './components/Increment';
import HowMethod from './components/SprintBackpack';
import HowCompetencies from './components/QualitiesBacklog';
import HowPrinciples from './components/DefinitionOfDone';
import WhoIHelp from './components/Retrospective';
import WhereIApplyIt from './components/ScrumValues';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Footer from './components/Footer';
import { handleDownloadPdf, handleDownloadDocx } from './utils/downloader';
import { useRouter } from './hooks/useRouter';

function App() {
  const { route, navigate } = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const downloadContent = async () => {
      if (isDownloading) return;

      if (route === '/pdf' || route === '/pdf/') {
        setIsDownloading(true);
        await handleDownloadPdf();
        navigate('/');
        setIsDownloading(false);
      } else if (route === '/docx' || route === '/docx/') {
        setIsDownloading(true);
        await handleDownloadDocx();
        navigate('/');
        setIsDownloading(false);
      }
    };

    downloadContent();
  }, [route, navigate, isDownloading]);

  return (
    <ThemeProvider>
      <div className="min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <Header />
        <main id="pdf-content" className="container mx-auto px-4 py-8">
          <div className="space-y-16">
            <Profile />
            <NavigationMenu />
            <WhyMission />
            <WhatValue />
            <WhatResults />
            <HowMethod />
            <HowPrinciples />
            <HowCompetencies />
            <Experience />
            <Certifications />
            <WhoIHelp />
            <WhereIApplyIt />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
