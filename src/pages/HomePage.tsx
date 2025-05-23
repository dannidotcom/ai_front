import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Award, ArrowRight, Brain, Sparkles, Target, Users, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Hero Section */}
      <section className="relative hero-gradient pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="rounded-full bg-gradient-to-br from-blue-100 to-teal-100 p-4 shadow-lg">
                <Brain className="h-16 w-16 text-blue-800" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="gradient-text">AI-Recruteur</span>
                <br />
                <span className="text-3xl sm:text-4xl text-gray-800 mt-4 block">
                  Simulateur d'entretien intelligent
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Préparez-vous efficacement aux entretiens d'embauche grâce à notre simulateur alimenté par l'IA qui analyse les offres d'emploi et conduit des entretiens personnalisés.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link 
                  to="/job-analysis" 
                  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-blue-800 to-blue-700 text-white font-medium py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>

                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center bg-white text-blue-800 font-medium py-4 px-8 rounded-xl border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  En savoir plus
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-1/4 w-16 h-16 text-teal-500 opacity-20"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-20 right-1/4 w-20 h-20 text-blue-500 opacity-20"
            >
              <Target className="w-full h-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-teal-600 font-semibold mb-2 block">FONCTIONNALITÉS</span>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Comment ça fonctionne</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Un processus simple et efficace pour vous préparer aux entretiens
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<FileText className="h-12 w-12 text-teal-600" />}
              title="Analyse de l'offre d'emploi" 
              description="Notre IA analyse votre offre d'emploi et extrait automatiquement les compétences clés et le profil recherché."
              delay={0}
            />
            
            <FeatureCard 
              icon={<MessageSquare className="h-12 w-12 text-teal-600" />}
              title="Simulation d'entretien" 
              description="Participez à un entretien interactif avec des questions techniques et RH parfaitement adaptées au poste."
              delay={0.2}
            />
            
            <FeatureCard 
              icon={<Award className="h-12 w-12 text-teal-600" />}
              title="Évaluation détaillée" 
              description="Recevez une analyse complète de votre performance avec des recommandations personnalisées."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-teal-600 font-semibold mb-2 block">AVANTAGES</span>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Pourquoi choisir AI-Recruteur ?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitCard
              icon={<Star className="h-6 w-6 text-teal-600" />}
              title="Entraînement personnalisé"
              description="Des questions spécifiquement adaptées au poste que vous visez."
            />
            <BenefitCard
              icon={<Check className="h-6 w-6 text-teal-600" />}
              title="Feedback constructif"
              description="Identifiez vos points forts et vos axes d'amélioration."
            />
            <BenefitCard
              icon={<Target className="h-6 w-6 text-teal-600" />}
              title="Gain de confiance"
              description="Arrivez mieux préparé et plus confiant à vos entretiens réels."
            />
            <BenefitCard
              icon={<Users className="h-6 w-6 text-teal-600" />}
              title="Économisez du temps"
              description="Préparez-vous efficacement sans avoir à chercher des questions types."
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <StatCard number="98%" text="Taux de satisfaction" />
            <StatCard number="1000+" text="Entretiens simulés" />
            <StatCard number="85%" text="Taux de réussite" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"
        >
          <div className="bg-gradient-to-r from-blue-800 to-teal-600 rounded-2xl p-12 text-center text-white shadow-xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Users className="h-16 w-16 mx-auto mb-6 text-blue-100" />
              <h2 className="text-4xl font-bold mb-4">Prêt à réussir votre prochain entretien ?</h2>
              <p className="text-blue-100 mb-8 text-xl max-w-2xl mx-auto">
                Ne laissez plus les entretiens vous stresser. Préparez-vous efficacement avec AI-Recruteur.
              </p>
              <Link 
                to="/job-analysis" 
                className="inline-flex items-center justify-center bg-white text-blue-800 font-medium py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Démarrer une simulation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 feature-card-hover border border-gray-100"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="mb-6 inline-block bg-blue-50 p-4 rounded-lg"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-blue-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex-shrink-0 mr-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-blue-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

interface StatCardProps {
  number: string;
  text: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="stat-gradient rounded-xl p-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-5xl font-bold gradient-text mb-3">{number}</div>
        <div className="text-gray-600 text-lg">{text}</div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;