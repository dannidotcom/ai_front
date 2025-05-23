import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobAnalysisPage from './pages/JobAnalysisPage';
import InterviewPage from './pages/InterviewPage';
import ResultsPage from './pages/ResultsPage';
import { JobProvider } from './context/JobContext';
import { InterviewProvider } from './context/InterviewContext';

function App() {
  return (
    <JobProvider>
      <InterviewProvider>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/job-analysis" element={<JobAnalysisPage />} />
              <Route path="/interview" element={<InterviewPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </InterviewProvider>
    </JobProvider>
  );
}

export default App;