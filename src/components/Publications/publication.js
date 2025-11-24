// src/components/CreerPublication.jsx
import React, { useState } from 'react';
import { publicationService } from '../services/api';

const CreerPublication = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    budget: '',
    delai: '',
    categorie: '',
    competencesRequises: []
  });
  const [fichiers, setFichiers] = useState([]);
  const [competence, setCompetence] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    { value: 'developpement-web', label: 'Développement Web' },
    { value: 'design', label: 'Design' },
    { value: 'redaction', label: 'Rédaction' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'traduction', label: 'Traduction' },
    { value: 'autre', label: 'Autre' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFichiers(Array.from(e.target.files));
  };

  const ajouterCompetence = () => {
    if (competence.trim() && !formData.competencesRequises.includes(competence.trim())) {
      setFormData(prev => ({
        ...prev,
        competencesRequises: [...prev.competencesRequises, competence.trim()]
      }));
      setCompetence('');
    }
  };

  const supprimerCompetence = (comp) => {
    setFormData(prev => ({
      ...prev,
      competencesRequises: prev.competencesRequises.filter(c => c !== comp)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Créer un FormData pour envoyer les fichiers
      const data = new FormData();
      data.append('titre', formData.titre);
      data.append('description', formData.description);
      data.append('budget', formData.budget);
      data.append('delai', formData.delai);
      data.append('categorie', formData.categorie);
      data.append('competencesRequises', JSON.stringify(formData.competencesRequises));

      // Ajouter les fichiers
      fichiers.forEach(file => {
        data.append('fichiers', file);
      });

      const response = await publicationService.creerPublication(data);
      setSuccess('Publication créée avec succès !');
      
      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        description: '',
        budget: '',
        delai: '',
        categorie: '',
        competencesRequises: []
      });
      setFichiers([]);
      
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de la publication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Créer une publication</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre du projet *
          </label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Ex: Création d'un site web e-commerce"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description détaillée *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Décrivez votre projet en détail..."
          />
        </div>

        {/* Budget et Délai */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget (TND) *
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Délai *
            </label>
            <input
              type="text"
              name="delai"
              value={formData.delai}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: 2 semaines"
            />
          </div>
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie *
          </label>
          <select
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Compétences requises */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compétences requises
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={competence}
              onChange={(e) => setCompetence(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), ajouterCompetence())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: React, Node.js..."
            />
            <button
              type="button"
              onClick={ajouterCompetence}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.competencesRequises.map(comp => (
              <span
                key={comp}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center gap-2"
              >
                {comp}
                <button
                  type="button"
                  onClick={() => supprimerCompetence(comp)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Fichiers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pièces jointes (Max 5 fichiers, 5MB chacun)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {fichiers.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {fichiers.length} fichier(s) sélectionné(s)
            </div>
          )}
        </div>

        {/* Bouton Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Publication en cours...' : 'Publier le projet'}
        </button>
      </form>
    </div>
  );
};

export default CreerPublication;