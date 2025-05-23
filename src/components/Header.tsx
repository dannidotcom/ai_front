import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-blue-800" />
          <span className="font-bold text-xl text-blue-900">AI-Recruteur</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" label="Accueil" current={location.pathname === '/'} />
          <NavLink to="/job-analysis" label="Analyse" current={location.pathname === '/job-analysis'} />
          <NavLink to="/interview" label="Entretien" current={location.pathname === '/interview'} />
          <NavLink to="/results" label="Résultats" current={location.pathname === '/results'} />
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  current: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, current }) => {
  return (
    <Link
      to={to}
      className={`${
        current
          ? 'text-blue-800 border-b-2 border-blue-800'
          : 'text-gray-600 hover:text-blue-800 hover:border-b-2 hover:border-blue-800'
      } font-medium transition-colors duration-200`}
    >
      {label}
    </Link>
  );
};

export default Header;