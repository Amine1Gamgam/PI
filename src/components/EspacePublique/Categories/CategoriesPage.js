import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProjects();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/publications');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const getProjectsByCategory = (categoryId) => {
    if (!categoryId) return projects;
    return projects.filter(p => p.categorie?._id === categoryId || p.categorie === categoryId);
  };

  const filteredProjects = selectedCategory 
    ? getProjectsByCategory(selectedCategory._id)
    : projects;

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.heroContent}
          >
            <h1 style={styles.pageTitle}>
              Explorez tous les <span style={styles.gradientText}>domaines d'expertise</span>
            </h1>
            <p style={styles.pageSubtitle}>
              Découvrez nos catégories et trouvez le freelance parfait pour votre projet
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={styles.content}>
        <div style={styles.container}>
          {loading ? (
            <div style={styles.loadingState}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Chargement des catégories...</p>
            </div>
          ) : (
            <>
              <div style={styles.categoriesGrid}>
                {categories.map((category, index) => (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      ...styles.categoryCard,
                      ...(selectedCategory?._id === category._id ? styles.categoryCardActive : {})
                    }}
                    onClick={() => setSelectedCategory(selectedCategory?._id === category._id ? null : category)}
                  >
                    <div style={{
                      ...styles.categoryIconLarge,
                      backgroundColor: category.couleur || '#3b82f6',
                    }}>{category.icone}</div>
                    <h3 style={styles.categoryName}>{category.nom_categorie}</h3>
                    <p style={styles.categoryDescription}>{category.description}</p>
                    <div style={styles.categoryStats}>
                      <div style={styles.statItem}>
                        <span style={styles.statNumber}>{getProjectsByCategory(category._id).length}</span>
                        <span style={styles.statLabel}>Projets disponibles</span>
                      </div>
                    </div>
                    <button style={styles.categoryBtn}>
                      {selectedCategory?._id === category._id ? 'Tous les projets' : 'Voir les projets'}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Projects Section */}
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={styles.projectsSection}
                >
                  <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>
                      Projets en {selectedCategory.nom_categorie}
                    </h2>
                    <button 
                      style={styles.clearFilterBtn}
                      onClick={() => setSelectedCategory(null)}
                    >
                      Effacer le filtre
                    </button>
                  </div>

                  {filteredProjects.length > 0 ? (
                    <div style={styles.projectsGrid}>
                      {filteredProjects.slice(0, 6).map((project) => (
                        <div key={project._id} style={styles.projectCard}>
                          <div style={styles.projectHeader}>
                            <h3 style={styles.projectTitle}>{project.titre}</h3>
                            <span style={styles.projectBudget}>{project.budget} TND</span>
                          </div>
                          <p style={styles.projectDescription}>
                            {project.description?.substring(0, 120)}...
                          </p>
                          <div style={styles.projectFooter}>
                            <span style={styles.projectDate}>
                              {new Date(project.dateLimite).toLocaleDateString('fr-FR')}
                            </span>
                            <Link to="/inscription" style={styles.projectLink}>
                              Postuler
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={styles.noProjects}>
                      <p style={styles.noProjectsText}>Aucun projet disponible dans cette catégorie pour le moment.</p>
                      <Link to="/inscription" style={styles.btnPrimary}>
                        Publier un projet
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {/* CTA Section */}
              {!selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={styles.cta}
                >
                  <h2 style={styles.ctaTitle}>Votre expertise ne figure pas dans la liste ?</h2>
                  <p style={styles.ctaText}>Rejoignez-nous et créez votre profil dans n'importe quel domaine</p>
                  <div style={styles.ctaButtons}>
                    <Link to="/inscription" style={styles.btnPrimaryCta}>
                      Devenir freelance
                    </Link>
                    <Link to="/inscription" style={styles.btnSecondaryCta}>
                      Publier un projet
                    </Link>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '120px 20px 80px',
    textAlign: 'center',
    color: '#ffffff',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  pageTitle: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '24px',
    lineHeight: '1.2',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  pageSubtitle: {
    fontSize: '20px',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  content: {
    padding: '80px 20px',
  },
  loadingState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 20px',
  },
  loadingText: {
    fontSize: '16px',
    color: '#6b7280',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '32px',
    marginBottom: '60px',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '20px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  categoryCardActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(59, 130, 246, 0.2)',
  },
  categoryIconLarge: {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    marginBottom: '20px',
    margin: '0 auto 20px',
    borderRadius: '16px',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  categoryName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '12px',
  },
  categoryDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  categoryStats: {
    marginBottom: '24px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryBtn: {
    width: '100%',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  projectsSection: {
    marginTop: '60px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a2e',
  },
  clearFilterBtn: {
    padding: '10px 20px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  projectCard: {
    backgroundColor: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    gap: '12px',
  },
  projectTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a2e',
    flex: 1,
  },
  projectBudget: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    padding: '6px 12px',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
  },
  projectDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  projectFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
  },
  projectDate: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '500',
  },
  projectLink: {
    color: '#3b82f6',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  noProjects: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f9fafb',
    borderRadius: '16px',
  },
  noProjectsText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '24px',
  },
  btnPrimary: {
    display: 'inline-block',
    padding: '14px 32px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  cta: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '24px',
    marginTop: '80px',
    color: '#ffffff',
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  ctaText: {
    fontSize: '18px',
    marginBottom: '32px',
    opacity: 0.9,
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimaryCta: {
    display: 'inline-block',
    padding: '16px 40px',
    backgroundColor: '#ffffff',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  btnSecondaryCta: {
    display: 'inline-block',
    padding: '16px 40px',
    backgroundColor: 'transparent',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    border: '2px solid #ffffff',
    transition: 'all 0.2s',
  },
};

export default CategoriesPage;