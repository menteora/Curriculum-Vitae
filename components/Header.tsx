import React, { useState, useEffect } from 'react';
import { Sun, Moon, Target, Download, Loader2, FileText } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../context/ThemeContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import cvData from '../cv-data';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);
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


  const handleDownloadPdf = async () => {
    const content = document.getElementById('pdf-content');
    if (!content) {
      console.error("Content element not found for PDF export");
      return;
    }

    const mainContent = content.querySelector('div');
    if (!mainContent) {
        console.error("Main content container not found for PDF export");
        return;
    }

    setIsDownloadingPdf(true);

    const originalBodyColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'white';

    try {
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();
        const margin = 5; 
        const contentWidth = pdfWidth - margin * 2;
        
        let yPos = margin;

        const sections = Array.from(mainContent.children) as HTMLElement[];

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const canvas = await html2canvas(section, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: 1024
            });

            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

            if (yPos + imgHeight > pdfPageHeight - margin && yPos > margin) {
                pdf.addPage();
                yPos = margin;
            }

            pdf.addImage(imgData, 'PNG', margin, yPos, contentWidth, imgHeight);
            
            yPos += imgHeight;
            
            if (i < sections.length - 1) {
                const sectionSpacing = 10;
                yPos += sectionSpacing;

                if (yPos > pdfPageHeight - margin) {
                    pdf.addPage();
                    yPos = margin;
                }
            }
        }

        pdf.save("CV Luca D'Amico.pdf");
    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        document.body.style.backgroundColor = originalBodyColor;
        setIsDownloadingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    setIsDownloadingDocx(true);
    try {
      const doc = new Document({
        sections: [
          {
            children: [
              // Profile
              new Paragraph({ text: cvData.profile.name, heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: cvData.profile.title, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: cvData.profile.location, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: '' }),
              new Paragraph({ text: cvData.profile.finalFormula, italics: true, alignment: AlignmentType.CENTER }),
              new Paragraph({ text: '' }),

              // WHY
              new Paragraph({ text: cvData.whyMission.title, heading: HeadingLevel.HEADING_2 }),
              ...cvData.whyMission.statements.map((s) => new Paragraph({ text: s, bullet: { level: 0 } })),
              new Paragraph({ text: '' }),

              // WHAT
              new Paragraph({ text: cvData.whatValue.title, heading: HeadingLevel.HEADING_2 }),
              new Paragraph({ text: cvData.whatValue.intro, italics: true }),
              ...cvData.whatValue.areas.map((area) => new Paragraph({ text: area.name, bullet: { level: 0 }})),
              new Paragraph({ text: '' }),
              new Paragraph({ text: cvData.whatResults.title, heading: HeadingLevel.HEADING_3 }),
              ...cvData.whatResults.items.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),
              new Paragraph({ text: '' }),

              // HOW Method
              new Paragraph({ text: cvData.howMethod.title, heading: HeadingLevel.HEADING_2 }),
              new Paragraph({ text: cvData.howMethod.intro, italics: true }),
              ...cvData.howMethod.pdca.flatMap((quad) => [
                new Paragraph({ children: [new TextRun({ text: `${quad.title} - ${quad.subtitle}`, bold: true })] }),
                ...quad.items.map((item) => new Paragraph({ 
                  text: item,
                  bullet: { level: 0 } 
                })),
                new Paragraph({ text: '' }),
              ]),
              
              // HOW Principles
              new Paragraph({ text: cvData.howPrinciples.title, heading: HeadingLevel.HEADING_3 }),
              new Paragraph({ children: [new TextRun({ text: cvData.howPrinciples.definitionOfValue.title, bold: true })] }),
              new Paragraph({ text: cvData.howPrinciples.definitionOfValue.subtitle, italics: true }),
              ...cvData.howPrinciples.definitionOfValue.items.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),
              new Paragraph({ text: '' }),

              // HOW Competencies
              new Paragraph({ text: cvData.howCompetencies.title, heading: HeadingLevel.HEADING_2 }),
              ...cvData.howCompetencies.items.map((c) => new Paragraph({ text: c.name, bullet: { level: 0 }})),
              new Paragraph({ text: '' }),
              
              // Experience
              new Paragraph({ text: 'Esperienze Professionali', heading: HeadingLevel.HEADING_3 }),
              ...cvData.experience.flatMap((exp) => [
                  new Paragraph({ children: [new TextRun({ text: exp.company, bold: true })] }),
                  ...exp.roles.map((role) => new Paragraph({ text: role, bullet: { level: 0 } })),
                  new Paragraph({ text: '' }),
              ]),

              // Certifications
              new Paragraph({ text: 'Formazione & Certificazioni', heading: HeadingLevel.HEADING_3 }),
              ...cvData.certifications.map((cert) => new Paragraph({ 
                children: [
                  new TextRun({ text: `${cert.name} ` }),
                  new TextRun({ text: `(${cert.date})`, italics: true, color: "808080" })
                ],
                bullet: { level: 0 } 
              })),
              new Paragraph({ text: '' }),
              
              // WHO
              new Paragraph({ text: cvData.whoIHelp.title, heading: HeadingLevel.HEADING_2 }),
              ...cvData.whoIHelp.items.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),
              new Paragraph({ text: '' }),
              
              // WHERE
              new Paragraph({ text: cvData.whereIApplyIt.title, heading: HeadingLevel.HEADING_2 }),
              ...cvData.whereIApplyIt.items.map((item) => new Paragraph({ text: item, bullet: { level: 0 } })),
              new Paragraph({ text: '' }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "CV Luca D'Amico.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error generating DOCX:", error);
    } finally {
      setIsDownloadingDocx(false);
    }
  };


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
            <div className="hidden md:flex items-center">
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="p-2 ml-4 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Scarica come PDF"
              >
                {isDownloadingPdf ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Download className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={handleDownloadDocx}
                disabled={isDownloadingDocx}
                className="p-2 ml-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Scarica come DOCX"
              >
                {isDownloadingDocx ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <FileText className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;