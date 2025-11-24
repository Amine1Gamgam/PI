import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ModernLandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    projects: 10,
    freelancers: 10,
    clients: 10,
    completed: 10
  });

  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [pubRes, userRes] = await Promise.all([
        axios.get('http://localhost:8001/api/publications'),
        axios.get('http://localhost:8001/api/utilisateurs')
      ]);
      
      setStats({
        projects: pubRes.data.length,
        freelancers: userRes.data.filter(u => u.role === 'freelance').length,
        clients: userRes.data.filter(u => u.role === 'client').length,
        completed: pubRes.data.filter(p => p.statut === 'Terminé').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const styles = {
    page: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9ff',
      minHeight: '100vh',
    },
    heroSection: {
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 20px 80px',
      background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)',
      overflow: 'hidden',
    },
    blob1: {
      position: 'absolute',
      top: '-10%',
      right: '-5%',
      width: '500px',
      height: '500px',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)',
      borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
      opacity: 0.3,
      filter: 'blur(40px)',
    },
    blob2: {
      position: 'absolute',
      bottom: '-10%',
      left: '-5%',
      width: '400px',
      height: '400px',
      background: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 100%)',
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      opacity: 0.2,
      filter: 'blur(40px)',
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    },
    heroLeft: {
      paddingRight: '20px',
    },
    heroLabel: {
      display: 'inline-block',
      padding: '8px 20px',
      backgroundColor: '#e0e7ff',
      color: '#4f46e5',
      borderRadius: '50px',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '24px',
    },
    heroTitle: {
      fontSize: '56px',
      fontWeight: '800',
      lineHeight: '1.2',
      color: '#1e293b',
      marginBottom: '24px',
    },
    heroTitleHighlight: {
      color: '#6366f1',
      position: 'relative',
    },
    heroSubtitle: {
      fontSize: '18px',
      lineHeight: '1.7',
      color: '#64748b',
      marginBottom: '36px',
    },
    heroButtons: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
    },
    btnPrimary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 32px',
      backgroundColor: '#6366f1',
      color: '#ffffff',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
      transition: 'all 0.3s ease',
    },
    btnSecondary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 32px',
      backgroundColor: 'transparent',
      color: '#6366f1',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      border: '2px solid #e0e7ff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    heroRight: {
      position: 'relative',
      height: '500px',
    },
    heroImageContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      overflow: 'hidden',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    floatingCard: {
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '20px 24px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    floatingCard1: {
      top: '20px',
      right: '-20px',
    },
    floatingCard2: {
      bottom: '40px',
      left: '-20px',
    },
    cardIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      flexShrink: 0,
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    cardNumber: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#1e293b',
    },
    cardLabel: {
      fontSize: '13px',
      color: '#64748b',
      fontWeight: '500',
    },
    section: {
      padding: '80px 20px',
      backgroundColor: '#ffffff',
    },
    sectionAlt: {
      padding: '80px 20px',
      backgroundColor: '#f8f9ff',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    sectionLabel: {
      display: 'inline-block',
      padding: '8px 20px',
      backgroundColor: '#e0e7ff',
      color: '#6366f1',
      borderRadius: '50px',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    sectionTitle: {
      fontSize: '42px',
      fontWeight: '800',
      color: '#1e293b',
      marginBottom: '16px',
      lineHeight: '1.2',
    },
    sectionSubtitle: {
      fontSize: '18px',
      color: '#64748b',
      lineHeight: '1.7',
      maxWidth: '700px',
      margin: '0 auto',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    categoryCard: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '32px',
      border: '2px solid #f1f5f9',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
    },
    categoryIcon: {
      width: '70px',
      height: '70px',
      margin: '0 auto 20px',
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      color: '#ffffff',
    },
    categoryName: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '12px',
    },
    categoryDesc: {
      fontSize: '14px',
      color: '#64748b',
      lineHeight: '1.6',
      marginBottom: '16px',
    },
    categoryCount: {
      fontSize: '13px',
      color: '#6366f1',
      fontWeight: '600',
      backgroundColor: '#f0f1ff',
      padding: '6px 12px',
      borderRadius: '50px',
      display: 'inline-block',
    },
    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px',
    },
    stepCard: {
      textAlign: 'center',
      position: 'relative',
    },
    stepNumber: {
      width: '70px',
      height: '70px',
      margin: '0 auto 24px',
      backgroundColor: '#6366f1',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: '800',
      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
    },
    stepTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '12px',
    },
    stepDesc: {
      fontSize: '15px',
      color: '#64748b',
      lineHeight: '1.6',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '40px',
      padding: '60px 0',
    },
    statCard: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '56px',
      fontWeight: '900',
      color: '#6366f1',
      marginBottom: '8px',
      lineHeight: '1',
    },
    statLabel: {
      fontSize: '16px',
      color: '#64748b',
      fontWeight: '600',
    },
    ctaSection: {
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      textAlign: 'center',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
    },
    ctaBlob: {
      position: 'absolute',
      width: '400px',
      height: '400px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      filter: 'blur(80px)',
    },
    ctaTitle: {
      fontSize: '48px',
      fontWeight: '800',
      marginBottom: '20px',
      lineHeight: '1.2',
      position: 'relative',
      zIndex: 1,
    },
    ctaSubtitle: {
      fontSize: '20px',
      marginBottom: '40px',
      opacity: 0.95,
      position: 'relative',
      zIndex: 1,
    },
    ctaButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      position: 'relative',
      zIndex: 1,
    },
    btnCtaPrimary: {
      display: 'inline-block',
      padding: '18px 40px',
      backgroundColor: '#ffffff',
      color: '#6366f1',
      borderRadius: '50px',
      fontSize: '17px',
      fontWeight: '700',
      textDecoration: 'none',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
    },
    btnCtaSecondary: {
      display: 'inline-block',
      padding: '18px 40px',
      backgroundColor: 'transparent',
      color: '#ffffff',
      borderRadius: '50px',
      fontSize: '17px',
      fontWeight: '700',
      textDecoration: 'none',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        
        <div style={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={styles.heroLeft}
          >
            <span style={styles.heroLabel}>Plateforme Freelance Tunisienne</span>
            <h1 style={styles.heroTitle}>
              Trouvez le <span style={styles.heroTitleHighlight}>freelance parfait</span> pour votre projet
            </h1>
            <p style={styles.heroSubtitle}>
              Connectez-vous avec des milliers de freelances talentueux. 
              Publiez votre projet gratuitement et recevez des propositions en 24h.
            </p>
            <div style={styles.heroButtons}>
              <Link to="/inscription" style={styles.btnPrimary}>
                Publier un projet
              </Link>
              <Link to="/inscription" style={styles.btnSecondary}>
                Devenir freelance
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={styles.heroRight}
          >
            <div style={styles.heroImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Freelancers working"
                style={styles.heroImage}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{...styles.floatingCard, ...styles.floatingCard1}}
            >
              <div style={{...styles.cardIcon, backgroundColor: '#dbeafe'}}>
                <span style={{color: '#3b82f6'}}>📊</span>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardNumber}>{stats.projects}+</div>
                <div style={styles.cardLabel}>Projets actifs</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{...styles.floatingCard, ...styles.floatingCard2}}
            >
              <div style={{...styles.cardIcon, backgroundColor: '#dcfce7'}}>
                <span style={{color: '#22c55e'}}>👥</span>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardNumber}>{stats.freelancers}+</div>
                <div style={styles.cardLabel}>Freelances experts</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>Domaines d'expertise</span>
            <h2 style={styles.sectionTitle}>Explorez toutes les catégories</h2>
            <p style={styles.sectionSubtitle}>
              Des freelances qualifiés dans tous les domaines pour réaliser vos projets
            </p>
          </div>

          <div style={styles.categoriesGrid}>
            {categories.slice(0, 6).map((cat, index) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={styles.categoryCard}
              >
                <div style={{
                  ...styles.categoryIcon,
                  backgroundColor: cat.couleur || '#6366f1'
                }}>
                  {cat.icone}
                </div>
                <h3 style={styles.categoryName}>{cat.nom_categorie}</h3>
                <p style={styles.categoryDesc}>{cat.description}</p>
                <span style={styles.categoryCount}>
                  {cat.nombrePublications || 0} projets
                </span>
              </motion.div>
            ))}
          </div>

          <div style={{textAlign: 'center'}}>
            <Link to="/categories" style={styles.btnSecondary}>
              Voir toutes les catégories
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>Simple et efficace</span>
            <h2 style={styles.sectionTitle}>Comment ça marche ?</h2>
            <p style={styles.sectionSubtitle}>
              Lancez votre projet en 4 étapes simples
            </p>
          </div>

          <div style={styles.stepsGrid}>
            {[
              {title: 'Publiez', desc: 'Décrivez votre projet en quelques clics'},
              {title: 'Recevez', desc: 'Comparez les propositions de freelances'},
              {title: 'Collaborez', desc: 'Travaillez avec le talent choisi'},
              {title: 'Validez', desc: 'Payez une fois satisfait du résultat'}
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={styles.stepCard}
              >
                <div style={styles.stepNumber}>{index + 1}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.projects}+</div>
              <div style={styles.statLabel}>Projets Publiés</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.freelancers}+</div>
              <div style={styles.statLabel}>Freelances Actifs</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.clients}+</div>
              <div style={styles.statLabel}>Clients Satisfaits</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.completed}+</div>
              <div style={styles.statLabel}>Projets Réalisés</div>
            </div>
          </div>
        </div>
      </section>
{/* Testimonials Section */}
<section style={styles.sectionAlt}>
  <div style={styles.container}>
    <div style={styles.sectionHeader}>
      <span style={styles.sectionLabel}>Témoignages</span>
      <h2 style={styles.sectionTitle}>Ce que nos clients disent</h2>
      <p style={styles.sectionSubtitle}>
        Nos freelances et clients partagent leur expérience avec notre plateforme
      </p>
    </div>

    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
      {[
        {
          name: 'Ali B.',
          role: 'Freelance',
          feedback: 'Grâce à cette plateforme, j’ai pu collaborer avec plusieurs clients et augmenter mes revenus.',
          rating: 4,
          avatar: 'https://randomuser.me/api/portraits/men/52.jpg'
        },
        {
          name: 'Nadia R.',
          role: 'Client',
          feedback: 'Très simple et efficace, je recommande à tous mes collègues.',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          name: 'Karim L.',
          role: 'Freelance',
          feedback: 'Les projets sont variés et bien rémunérés. Une super expérience !',
          rating: 5,
          avatar: 'https://randomuser.me/api/portraits/men/34.jpg'
        }
      ].map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '30px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            style={{width: '80px', height: '80px', borderRadius: '50%', marginBottom: '16px', objectFit: 'cover'}}
          />
          
          {/* Feedback */}
          <p style={{fontSize: '16px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px'}}>
            "{testimonial.feedback}"
          </p>

          {/* Name and role */}
          <h4 style={{fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '4px'}}>
            {testimonial.name}
          </h4>
          <span style={{fontSize: '14px', color: '#6366f1', fontWeight: '600', marginBottom: '12px'}}>
            {testimonial.role}
          </span>

          {/* Stars */}
          <div style={{display: 'flex', gap: '4px'}}>
            {Array.from({length: 5}, (_, i) => (
              <span key={i} style={{color: i < testimonial.rating ? '#facc15' : '#e5e7eb', fontSize: '18px'}}>★</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={{...styles.ctaBlob, top: '-200px', right: '-200px'}}></div>
        <div style={{...styles.ctaBlob, bottom: '-200px', left: '-200px'}}></div>
        
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>Prêt à démarrer votre projet ?</h2>
          <p style={styles.ctaSubtitle}>
            Rejoignez notre communauté de freelances et clients satisfaits
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/inscription" style={styles.btnCtaPrimary}>
              Commencer maintenant
            </Link>
            <Link to="/categories" style={styles.btnCtaSecondary}>
              Explorer les catégories
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default ModernLandingPage;