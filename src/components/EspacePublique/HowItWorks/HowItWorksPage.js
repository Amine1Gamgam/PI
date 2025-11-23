import React, { useState } from 'react';

export default function FreelanceClientSteps() {
  const [userType, setUserType] = useState('client');

  const FileEditIcon = () => (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const SearchIcon = () => (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const UserCheckIcon = () => (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const MessageIcon = () => (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );

  const RocketIcon = () => (
    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const SmallCheckIcon = () => (
    <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const clientSteps = [
    {
      number: '01',
      icon: <FileEditIcon />,
      title: 'Publiez votre projet',
      description: 'Décrivez votre besoin en détail, fixez votre budget et définissez vos délais. La publication est 100% gratuite et ne prend que quelques minutes.',
      features: [
        'Formulaire simple et guidé',
        'Budget flexible et ajustable',
        'Choix de catégorie précis',
        'Pièces jointes acceptées'
      ]
    },
    {
      number: '02',
      icon: <SearchIcon />,
      title: 'Recevez des propositions',
      description: 'Les freelances qualifiés vous envoient leurs propositions avec leurs tarifs, délais et portfolio.',
      features: [
        'Propositions sous 24h',
        'Profils vérifiés',
        'Portfolio détaillé',
        'Avis clients authentiques'
      ]
    },
    {
      number: '03',
      icon: <UserCheckIcon />,
      title: 'Choisissez votre freelance',
      description: 'Comparez les profils, échangez avec les candidats et sélectionnez le freelance idéal pour votre projet.',
      features: [
        'Comparaison facile',
        'Chat intégré',
        'Garantie de qualité',
        'Paiement sécurisé'
      ]
    },
    {
      number: '04',
      icon: <CheckCircleIcon />,
      title: 'Validez le travail',
      description: 'Suivez l\'avancement, demandez des modifications si nécessaire et validez le travail final.',
      features: [
        'Suivi en temps réel',
        'Révisions illimitées',
        'Validation par étapes',
        'Support dédié'
      ]
    }
  ];

  const freelanceSteps = [
    {
      number: '01',
      icon: <BriefcaseIcon />,
      title: 'Créez votre profil',
      description: 'Présentez vos compétences, votre expérience et vos réalisations. Un profil complet augmente vos chances de décrocher des missions.',
      features: [
        'Profil professionnel',
        'Portfolio personnalisé',
        'Tarifs flexibles',
        'Certification de compétences'
      ]
    },
    {
      number: '02',
      icon: <SearchIcon />,
      title: 'Trouvez des projets',
      description: 'Parcourez les projets disponibles, filtrez selon vos compétences et trouvez les missions qui vous correspondent.',
      features: [
        'Alertes personnalisées',
        'Filtres avancés',
        'Projets vérifiés',
        'Nouveaux projets quotidiens'
      ]
    },
    {
      number: '03',
      icon: <MessageIcon />,
      title: 'Envoyez vos propositions',
      description: 'Rédigez des propositions convaincantes, présentez votre approche et négociez directement avec les clients.',
      features: [
        'Modèles de propositions',
        'Chat direct avec clients',
        'Devis détaillés',
        'Réponse rapide garantie'
      ]
    },
    {
      number: '04',
      icon: <RocketIcon />,
      title: 'Réalisez et facturez',
      description: 'Travaillez sur vos missions, livrez un travail de qualité et recevez vos paiements de manière sécurisée.',
      features: [
        'Paiement sécurisé',
        'Facturation automatique',
        'Protection freelance',
        'Notation et avis'
      ]
    }
  ];

  const steps = userType === 'client' ? clientSteps : freelanceSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-4 pb-12 px-4">
      <br /><br /><br /><br /><br />
      <div className="max-w-6xl mx-auto">
        {/* Header with buttons - Always visible at top */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 bg-white p-6 rounded-2xl shadow-xl max-w-3xl mx-auto border-2 border-indigo-100">
            <button
              onClick={() => setUserType('client')}
              className={`w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                userType === 'client'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
              }`}
            >
              👤 Je suis client
            </button>
            <button
              onClick={() => setUserType('freelance')}
              className={`w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                userType === 'freelance'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300'
              }`}
            >
              💼 Je suis freelance
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 px-4">
          En 4 étapes simples, {userType === 'client' ? 'trouvez votre freelance idéal' : 'décrochez vos missions'}
        </h1>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Step number and icon */}
                <div className="flex md:flex-col items-center gap-4 md:gap-0 flex-shrink-0">
                  <div className="text-5xl md:text-6xl font-bold text-indigo-200 md:mb-4">
                    {step.number}
                  </div>
                  <div className="md:mx-auto">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <SmallCheckIcon />
                        </div>
                        <span className="text-sm md:text-base text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center pb-8">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
            {userType === 'client' ? 'Publier mon projet gratuitement' : 'Créer mon profil freelance'}
          </button>
        </div>
      </div>
    </div>
  );
}