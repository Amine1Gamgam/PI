// src/components/DetailPublication.jsx
import React, { useState } from 'react';
import { publicationService } from '../services/api';

const DetailPublication = ({ publication, onClose, isFreelance }) => {
  const [showPropositionForm, setShowPropositionForm] = useState(false);
  const [proposition, setProposition] = useState({
    message: '',
    budget: '',
    delai: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePropositionChange = (e) => {
    const { name, value } = e.target;
    setProposition(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const envoyerProposition = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await publicationService.ajouterProposition(publication._id, proposition);
      setSuccess('Proposition envoyée avec succès !');
      setShowPropositionForm(false);
      setProposition({ message: '', budget: '', delai: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi de la proposition');
    } finally {
      setLoading(false);
    }
  };

  const getStatutBadge = (statut) => {
    const styles = {
      'ouvert': 'bg-green-100 text-green-800',
      'en-cours': 'bg-blue-100 text-blue-800',
      'termine': 'bg-gray-100 text-gray-800',
      'annule': 'bg-red-100 text-red-800'
    };
    return styles[statut] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Détails du projet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* En-tête */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-gray-900">{publication.titre}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutBadge(publication.statut)}`}>
                {publication.statut}
              </span>
            </div>
          </div>

          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <span className="text-sm text-gray-500">Budget</span>
              <p className="text-xl font-bold text-gray-900">{publication.budget} TND</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Délai</span>
              <p className="text-xl font-bold text-gray-900">{publication.delai}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Catégorie</span>
              <p className="text-xl font-bold text-gray-900 capitalize">
                {publication.categorie.replace('-', ' ')}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 whitespace-pre-line">{publication.description}</p>
          </div>

          {/* Compétences requises */}
          {publication.competencesRequises?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Compétences requises
              </h4>
              <div className="flex flex-wrap gap-2">
                {publication.competencesRequises.map((comp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pièces jointes */}
          {publication.piecesJointes?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Pièces jointes</h4>
              <div className="space-y-2">
                {publication.piecesJointes.map((fichier, idx) => (
                  <a
                    key={idx}
                    href={`http://localhost:5000/${fichier.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                    </svg>
                    {fichier.nom}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Propositions (pour le client) */}
          {!isFreelance && publication.propositions?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Propositions reçues ({publication.propositions.length})
              </h4>
              <div className="space-y-3">
                {publication.propositions.map((prop, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {prop.freelance?.nom || 'Freelance'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(prop.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        prop.statut === 'accepte' ? 'bg-green-100 text-green-800' :
                        prop.statut === 'refuse' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prop.statut}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{prop.message}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-700">
                        <strong>Budget:</strong> {prop.budget} TND
                      </span>
                      <span className="text-gray-700">
                        <strong>Délai:</strong> {prop.delai}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bouton proposer (pour les freelances) */}
          {isFreelance && publication.statut === 'ouvert' && (
            <div>
              {!showPropositionForm ? (
                <button
                  onClick={() => setShowPropositionForm(true)}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Envoyer une proposition
                </button>
              ) : (
                <form onSubmit={envoyerProposition} className="space-y-4 border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-semibold text-gray-900">Votre proposition</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={proposition.message}
                      onChange={handlePropositionChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Présentez votre approche et votre expérience..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre budget (TND) *
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={proposition.budget}
                        onChange={handlePropositionChange}
                        required
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre délai *
                      </label>
                      <input
                        type="text"
                        name="delai"
                        value={proposition.delai}
                        onChange={handlePropositionChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ex: 10 jours"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                      {loading ? 'Envoi...' : 'Envoyer'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPropositionForm(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPublication;