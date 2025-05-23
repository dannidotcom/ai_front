import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, Download, BarChart3, Award, Zap, FileText } from 'lucide-react';
import { JobContext } from '../context/JobContext';
import { InterviewContext } from '../context/InterviewContext';

const ResultsPage: React.FC = () => {
  const { jobDetails } = useContext(JobContext);
  const { evaluation, isInterviewComplete, answers } = useContext(InterviewContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if no evaluation or interview not complete
    if (!evaluation || !isInterviewComplete || !jobDetails) {
      navigate('/');
    }
  }, [evaluation, isInterviewComplete, jobDetails, navigate]);
  
  if (!evaluation || !jobDetails) {
    return null;
  }
  
  const getRecommendationColor = () => {
    switch (evaluation.recommendation) {
      case 'retenu':
        return 'text-green-600';
      case 'ajourné':
        return 'text-amber-600';
      case 'refusé':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  const getRecommendationIcon = () => {
    switch (evaluation.recommendation) {
      case 'retenu':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'ajourné':
        return <AlertCircle className="h-6 w-6 text-amber-600" />;
      case 'refusé':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return null;
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-blue-800 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Résultats d'entretien</h1>
            <p className="text-blue-100">Poste: {jobDetails.title}</p>
          </div>
          
          {/* Recommendation */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="h-6 w-6 text-blue-800 mr-2" />
              Recommandation finale
            </h2>
            
            <div className="flex items-center mb-4">
              {getRecommendationIcon()}
              <span className={`text-lg font-bold ml-2 ${getRecommendationColor()}`}>
                {evaluation.recommendation === 'retenu' && 'Candidature retenue'}
                {evaluation.recommendation === 'ajourné' && 'Candidature à revoir'}
                {evaluation.recommendation === 'refusé' && 'Candidature non retenue'}
              </span>
            </div>
            
            <p className="text-gray-700">{evaluation.feedback}</p>
          </div>
          
          {/* Score Overview */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="h-6 w-6 text-blue-800 mr-2" />
              Résultats par catégorie
            </h2>
            
            <div className="space-y-4">
              <ScoreBar 
                label="Compétences techniques" 
                score={evaluation.technicalScore} 
                color={getScoreColor(evaluation.technicalScore)} 
              />
              
              <ScoreBar 
                label="Compétences RH / Soft skills" 
                score={evaluation.hrScore} 
                color={getScoreColor(evaluation.hrScore)} 
              />
              
              <div className="pt-2 border-t">
                <ScoreBar 
                  label="Score global" 
                  score={evaluation.overallScore} 
                  color={getScoreColor(evaluation.overallScore)}
                  isBold
                />
              </div>
            </div>
          </div>
          
          {/* Strengths & Weaknesses */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Zap className="h-6 w-6 text-blue-800 mr-2" />
              Points forts et axes d'amélioration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h3 className="font-medium text-green-800 mb-3">Points forts</h3>
                <ul className="space-y-2">
                  {evaluation.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <h3 className="font-medium text-amber-800 mb-3">Axes d'amélioration</h3>
                <ul className="space-y-2">
                  {evaluation.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Answers (Collapsed by default) */}
        <details className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <summary className="bg-gray-50 p-4 cursor-pointer font-medium text-gray-800 flex items-center">
            <FileText className="h-5 w-5 text-blue-800 mr-2" />
            Voir le détail des réponses
          </summary>
          
          <div className="p-4 divide-y">
            {answers.map((answer, index) => (
              <div key={index} className="py-4">
                <p className="font-medium text-gray-800 mb-2">Question {index + 1}:</p>
                <p className="text-gray-700 mb-3">
                  {answers.length > 0 && index < answers.length ? 
                    `Q: ${index < answers.length ? answers[index].questionId : 'N/A'}` : 
                    'Question non disponible'}
                </p>
                
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Votre réponse:</span> {answer.text}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{answer.feedback}</span>
                  <div className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs font-medium">
                    Score: {answer.score}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        </details>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            Nouvel entretien
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <button 
            onClick={() => {
              // In a real app, this would download a PDF report
              alert('Téléchargement du rapport (fonctionnalité simulée)');
            }}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            Télécharger le rapport
            <Download className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ScoreBarProps {
  label: string;
  score: number;
  color: string;
  isBold?: boolean;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, score, color, isBold = false }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className={`text-gray-700 ${isBold ? 'font-semibold' : ''}`}>{label}</span>
        <span className={`${isBold ? 'font-bold' : 'font-medium'}`}>{score.toFixed(1)}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${(score / 10) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ResultsPage;