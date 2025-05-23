import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { JobContext } from '../context/JobContext';

const JobAnalysisPage: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);
  const { setJobDetails, isAnalyzing, setIsAnalyzing, error, setError } = useContext(JobContext);
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Check file type
      if (file.type === 'text/plain' || file.type === 'application/pdf') {
        setUploadedFile(file);
        setShowError(false);
        setError(null);
        
        // For demo purposes, we'll just read text files
        if (file.type === 'text/plain') {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            setJobDescription(content);
          };
          reader.readAsText(file);
        } else {
          // In a real app, we would parse PDF here
          // For now, just set a placeholder message
          setJobDescription(`[Contenu du PDF ${file.name}]`);
        }
      } else {
        setShowError(true);
        setError('Format de fichier non supporté. Veuillez télécharger un fichier .txt ou .pdf');
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobDescription.trim()) {
      setShowError(true);
      setError('Veuillez entrer une description de poste ou télécharger un fichier');
      return;
    }
    
    setIsAnalyzing(true);
    setShowError(false);
    
    try {
      // Simulate API call to analyze job description
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mocked response for demonstration
      const analyzedJob = {
        title: 'Développeur Frontend React',
        company: 'Tech Solutions Inc.',
        skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Git', 'Tailwind CSS'],
        experience: '2-3 ans',
        description: 'Poste de développeur frontend spécialisé dans React et les technologies web modernes.',
        rawContent: jobDescription
      };
      
      setJobDetails(analyzedJob);
      setIsAnalyzing(false);
      navigate('/interview');
    } catch (err) {
      setIsAnalyzing(false);
      setShowError(true);
      setError('Une erreur est survenue lors de l\'analyse. Veuillez réessayer.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Analyse de l'offre d'emploi</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Soumettez votre offre d'emploi</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Text area for job description */}
            <div className="mb-6">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Description du poste
              </label>
              <textarea
                id="jobDescription"
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Collez ici le texte de l'offre d'emploi..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            {/* File upload */}
            <div className="mb-6">
              <div className="text-sm text-gray-700 mb-2">Ou téléchargez un fichier</div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-teal-500 transition-colors duration-200"
                onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {uploadedFile ? (
                    <span className="text-teal-600 font-medium flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {uploadedFile.name}
                    </span>
                  ) : (
                    'Cliquez pour télécharger un fichier .txt ou .pdf'
                  )}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".txt,.pdf"
                  onChange={handleFileUpload}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Formats supportés : .txt, .pdf</p>
            </div>
            
            {/* Error message */}
            {showError && error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:bg-blue-300"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                'Analyser l\'offre d\'emploi'
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-medium mb-1">Comment ça marche</p>
          <p>Notre IA va analyser l'offre d'emploi pour extraire les informations clés comme le titre du poste, les compétences requises et le niveau d'expérience. Ces informations seront utilisées pour générer un entretien personnalisé.</p>
        </div>
      </div>
    </div>
  );
};

export default JobAnalysisPage;