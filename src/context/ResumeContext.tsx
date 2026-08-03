import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ResumeData, INITIAL_DATA_PT, TemplateType } from '../../types';
import { useLanguage } from '../../LanguageContext';

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    template: TemplateType;
    setTemplate: (template: TemplateType) => void;
    handleDownloadPdf: () => Promise<void>;
    isGeneratingPdf: boolean;
    setIsGeneratingPdf: (isGenerating: boolean) => void;
    confirmType: 'clear' | 'example' | null;
    setConfirmType: (type: 'clear' | 'example' | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    const { language } = useLanguage();

    // Initialize state from localStorage if available, otherwise use defaults
    const [resumeData, setResumeData] = useState<ResumeData>(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedData = localStorage.getItem('resume_builder_data');
                if (savedData) {
                    return JSON.parse(savedData);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        }
        // Default to PT if no saved data
        return INITIAL_DATA_PT;
    });

    const [template, setTemplate] = useState<TemplateType>(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedTemplate = localStorage.getItem('resume_builder_template');
                if (savedTemplate) {
                    return savedTemplate as TemplateType;
                }
            } catch (error) {
                console.error('Erro ao carregar template:', error);
            }
        }
        return 'modern';
    });

    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [confirmType, setConfirmType] = useState<'clear' | 'example' | null>(null);

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('resume_builder_data', JSON.stringify(resumeData));
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('resume_builder_template', template);
    }, [template]);

    // PDF Generation Logic (Placeholder - actual implementation needs to stay near DOM or Ref)
    // Actually, we can keep the logic in Home or MainLayout and just expose the trigger via Context?
    // Or we provide a "registerDownloadHandler" but simpler is to keep the state here.
    // The actual "handleDownloadPdf" function relies on accessing the DOM elements. 
    // It's hard to put the function *implementation* here without refs to the DOM nodes.
    // So we will just provide the state here, and the function might need to be passed down or handled differently.
    // Let's implement a "triggerDownload" flag or similar? 
    // No, better: The logic stays in the Component that renders the Preview (Home), 
    // and we expose a way to CALL it from the Navbar.
    // So we can have a ref in Context? `downloadFunctionRef`.

    const downloadFunctionRef = React.useRef<() => Promise<void>>(async () => { });

    const registerDownloadFunction = (fn: () => Promise<void>) => {
        downloadFunctionRef.current = fn;
    };

    const handleDownloadPdf = async () => {
        if (downloadFunctionRef.current) {
            await downloadFunctionRef.current();
        }
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            template,
            setTemplate,
            handleDownloadPdf,
            isGeneratingPdf,
            setIsGeneratingPdf,
            confirmType,
            setConfirmType
        }}>
            {/* We need a way to pass the register function to Home. 
               Actually, we can just export a custom hook or add it to the context value. 
               Let's add `registerDownloadFunction` to value. 
               Wait, I forgot to add it to the interface. */}
            {/* Re-thinking: The Navbar is in Home (in my previous thought). 
               If Navbar is in Home, we don't need Context for Download. 
               BUT I plan to move Navbar to MainLayout later or keeping it in Home. 
               If I keep Navbar in Home, I don't need Context for `handleDownloadPdf`! 
               Accessing `resumeData` across pages? 
               We only need `resumeData` on Home. 
               Legal pages don't need `resumeData`. 
               So... DO I REALLY NEED CONTEXT? 
               Maybe NOT. 
               If `Home` contains everything related to the Resume Builder, including the Navbar (with tools), 
               And `Privacy` contains a Simple Navbar, 
               Then I don't need to lift state. 
               I will stick to the SIMPLER plan: No Context. Components-based composition. 
               
               I will cancel this file creation and proceed with Components.
           */}
            {children}
        </ResumeContext.Provider>
    );
};
