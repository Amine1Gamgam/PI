// src/components/ListePublications.jsx
import React, { useState, useEffect } from 'react';
import { publicationService } from '../services/api';

const ListePublications = ({ onSelectPublication }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtres, setFiltres] = useState({
    categorie: '',
    statut: ''
  });

  const categories = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'developpement-web', label: 'Développement Web' },
    { value: 'design', label: 'Design' },
    { value: 'redaction', label: 'Rédaction' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'traduction', label: 'Traduction' },
    { value: 'autre', label: 'Autre' }
  ];

  const statuts = [
    { value: '', label: 'Tous les statuts' },
    { value: 'ouvert', label: 'Ouvert' },
    { value: 'en-cours', label: 'En cours' },
    { value: 'termine', label: 'Terminé' }
  ];

  useEffect(() => {
    chargerPublications();
  }, [filtres]);

  const chargerPublications = async () => {
    try {
      setLoading(true);
      const response = await publicationService.obtenirPublications(filtres);
      setPublications(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des publications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltreChange = (e) => {
    const { name, value } = e.target;
    setFiltres(prev => ({
      ...prev,
      [name]: value
    }));
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Projets disponibles
      </h2>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              name="categorie"
              value={filtres.categorie}
              onChange={handleFiltreChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              name="statut"
              value={filtres.statut}
              onChange={handleFiltreChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {statuts.map(stat => (
                <option key={stat.value} value={stat.value}>
                  {stat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Liste des publications */}
      <div className="space-y-4">
        {publications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">Aucune publication trouvée</p>
          </div>
        ) : (
          publications.map(pub => (
            <div
              key={pub._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectPublication && onSelectPublication(pub)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {pub.titre}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {pub.description}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutBadge(pub.statut)}`}>
                  {pub.statut}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Budget</span>
                  <p className="font-semibold text-gray-900">{pub.budget} TND</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Délai</span>
                  <p className="font-semibold text-gray-900">{pub.delai}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Catégorie</span>
                  <p className="font-semibold text-gray-900 capitalize">
                    {pub.categorie.replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Propositions</span>
                  <p className="font-semibold text-gray-900">
                    {pub.propositions?.length || 0}
                  </p>
                </div>
              </div>

              {pub.competencesRequises?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {pub.competencesRequises.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Publié le {new Date(pub.createdAt).toLocaleDateString('fr-FR')}
                </span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Voir détails
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListePublications;