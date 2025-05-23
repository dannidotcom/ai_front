import React from 'react';
import { Brain } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Brain className="h-6 w-6 text-teal-500" />
            <span className="font-bold text-lg">AI-Recruteur</span>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {currentYear} AI-Recruteur - Simulateur d'entretien intelligent
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <FooterLink href="#" label="À propos" />
            <FooterLink href="#" label="Confidentialité" />
            <FooterLink href="#" label="Contact" />
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
    >
      {label}
    </a>
  );
};

export default Footer;