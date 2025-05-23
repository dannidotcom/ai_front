import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Mic, MicOff, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';
import { JobContext } from '../context/JobContext';
import { InterviewContext, Question } from '../context/InterviewContext';

const InterviewPage: React.FC = () => {
  const { jobDetails } = useContext(JobContext);
  const { 
    questions, 
    setQuestions, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    addAnswer, 
    setIsInterviewComplete,
    setEvaluation
  } = useContext(InterviewContext);
  
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [conversation, setConversation] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  
  // Redirect if no job details
  useEffect(() => {
    if (!jobDetails) {
      navigate('/job-analysis');
      return;
    }
    
    // Simulate API call to generate questions
    const generateQuestions = async () => {
      setIsLoading(true);
      
      try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock questions based on job details
        const mockQuestions: Question[] = [
          {
            id: '1',
            text: `Pouvez-vous me parler de votre expérience avec ${jobDetails.skills[0]} ?`,
            category: 'technical',
            difficulty: 'intermediate'
          },
          {
            id: '2',
            text: `Comment géreriez-vous un composant React qui doit afficher des données provenant d'une API externe ?`,
            category: 'technical',
            difficulty: 'intermediate'
          },
          {
            id: '3',
            text: 'Parlez-moi d\'une situation difficile que vous avez rencontrée dans un projet et comment vous l\'avez résolue.',
            category: 'behavioral',
            difficulty: 'intermediate'
          },
          {
            id: '4',
            text: 'Pourquoi êtes-vous intéressé par ce poste en particulier ?',
            category: 'hr',
            difficulty: 'beginner'
          },
          {
            id: '5',
            text: 'Où vous voyez-vous dans 5 ans ?',
            category: 'hr',
            difficulty: 'beginner'
          }
        ];
        
        setQuestions(mockQuestions);
        
        // Add interviewer introduction
        setConversation([
          {
            role: 'ai',
            content: `Bonjour et bienvenue à cet entretien pour le poste de ${jobDetails.title}. Je vais vous poser quelques questions pour évaluer vos compétences et votre adéquation avec le poste. Commençons.`
          },
          {
            role: 'ai',
            content: mockQuestions[0].text
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error generating questions:', error);
        setIsLoading(false);
      }
    };
    
    generateQuestions();
  }, [jobDetails, navigate, setQuestions]);
  
  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim() || isProcessingAnswer) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // Add user's answer to conversation
    setConversation(prev => [...prev, { role: 'user', content: userAnswer }]);
    
    setIsProcessingAnswer(true);
    
    try {
      // Simulate API call to evaluate answer
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate AI feedback
      let feedback;
      const score = Math.floor(Math.random() * 4) + 7; // Random score between 7-10 for demo
      
      if (score >= 9) {
        feedback = "Excellente réponse ! Vous avez parfaitement compris la question et fourni une explication claire et détaillée.";
      } else if (score >= 7) {
        feedback = "Bonne réponse. Vous avez abordé les points principaux, mais vous auriez pu approfondir certains aspects.";
      } else {
        feedback = "Réponse acceptable mais qui manque de précision. Essayez d'être plus spécifique dans vos explications.";
      }
      
      // Add AI feedback to conversation
      setConversation(prev => [...prev, { role: 'ai', content: feedback }]);
      
      // Save answer
      addAnswer({
        questionId: currentQuestion.id,
        text: userAnswer,
        score,
        feedback
      });
      
      // Clear input
      setUserAnswer('');
      
      // Move to next question or end interview
      if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        
        // Add next question to conversation after a short delay
        setTimeout(() => {
          setConversation(prev => [...prev, { 
            role: 'ai', 
            content: questions[nextIndex].text 
          }]);
          setIsProcessingAnswer(false);
        }, 1000);
      } else {
        // End interview
        setTimeout(() => {
          setConversation(prev => [...prev, { 
            role: 'ai', 
            content: "Merci pour vos réponses. L'entretien est maintenant terminé. Je vais procéder à l'évaluation de votre performance." 
          }]);
          
          // Generate final evaluation
          setTimeout(() => {
            setIsInterviewComplete(true);
            
            // Mock evaluation
            setEvaluation({
              technicalScore: 8.5,
              hrScore: 7.8,
              overallScore: 8.2,
              strengths: [
                'Bonnes connaissances techniques',
                'Communication claire',
                'Expérience pertinente'
              ],
              weaknesses: [
                'Réponses parfois trop génériques',
                'Pourrait approfondir certains sujets techniques'
              ],
              recommendation: 'retenu',
              feedback: 'Candidat prometteur avec de bonnes compétences techniques et une bonne communication. Quelques points à améliorer mais globalement un bon profil pour le poste.'
            });
            
            // Redirect to results page
            setTimeout(() => {
              navigate('/results');
            }, 2000);
          }, 2000);
          
          setIsProcessingAnswer(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error processing answer:', error);
      setIsProcessingAnswer(false);
    }
  };
  
  const toggleRecording = () => {
    // Toggle recording state (in a real app, this would start/stop speech recognition)
    setIsRecording(!isRecording);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-800 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Préparation de l'entretien...</h2>
        <p className="text-gray-600 mt-2">Nous générons des questions adaptées au poste de {jobDetails?.title}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Interview Header */}
          <div className="bg-blue-800 text-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">Entretien: {jobDetails?.title}</h1>
                <p className="text-blue-200 text-sm">
                  Question {currentQuestionIndex + 1} sur {questions.length}
                </p>
              </div>
              <div className="bg-blue-700 rounded-full px-3 py-1 text-sm">
                En cours
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-blue-900 rounded-full h-2 mt-3">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Chat Container */}
          <div className="h-[60vh] flex flex-col">
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {conversation.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-blue-100 text-blue-900' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.role === 'ai' && (
                      <div className="flex items-center mb-1">
                        <MessageSquare className="h-4 w-4 text-teal-600 mr-1" />
                        <span className="text-xs font-medium text-teal-600">AI-Recruteur</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t p-3">
              <div className="flex items-center">
                <button 
                  onClick={toggleRecording}
                  className={`p-2 rounded-full mr-2 ${
                    isRecording 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isRecording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                
                <textarea
                  className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Tapez votre réponse..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={1}
                  disabled={isProcessingAnswer}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitAnswer();
                    }
                  }}
                />
                
                <button 
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim() || isProcessingAnswer}
                  className={`p-2 rounded-full ml-2 ${
                    userAnswer.trim() && !isProcessingAnswer
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  title="Envoyer"
                >
                  {isProcessingAnswer ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {isProcessingAnswer && (
                <div className="text-xs text-gray-500 mt-1 flex items-center">
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  Analyse de votre réponse...
                </div>
              )}
            </div>
          </div>
          
          {/* Interview Info */}
          <div className="bg-gray-50 p-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Conseil:</span> Soyez concis et précis dans vos réponses
              </div>
              
              <button 
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir quitter l\'entretien ? Votre progression ne sera pas sauvegardée.')) {
                    navigate('/');
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                Quitter l'entretien
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;