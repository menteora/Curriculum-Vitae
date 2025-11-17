
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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

const MainContent = () => (
  <>
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
  </>
);

const Downloader = ({ downloadFn }: { downloadFn: () => Promise<void> }) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isDownloading) return;

    const download = async () => {
      setIsDownloading(true);
      await downloadFn();
      navigate('/');
    };

    download();
  }, [downloadFn, navigate, isDownloading]);

  // Render the main content so the page doesn't go blank during download prep
  return <MainContent />;
};

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/pdf" element={<Downloader downloadFn={handleDownloadPdf} />} />
          <Route path="/docx" element={<Downloader downloadFn={handleDownloadDocx} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;