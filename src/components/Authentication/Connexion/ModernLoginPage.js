import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ModernLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8001/api/login', {
        email: formData.email,
        mdp: formData.password
      });

      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      window.dispatchEvent(new Event('authChange'));

      setAlert({ type: 'success', message: 'Connexion réussie !' });
      
      setTimeout(() => {
        if (user.role === 'freelance' || user.role === 'candidat') {
          navigate('/dashboard-freelance');
        } else if (user.role === 'client') {
          navigate('/dashboard-client');
        } else if (user.role === 'admin') {
          navigate('/admin-workspace');
        } else {
          navigate('/');
        }
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'Email ou mot de passe incorrect' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Left Side - Form */}
      <div style={styles.leftSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.authCard}
        >
          <div style={styles.authHeader}>
            <div style={styles.logoIcon}>FL</div>
            <h1 style={styles.authTitle}>Bon retour parmi nous</h1>
            <p style={styles.authSubtitle}>Connectez-vous pour gérer vos projets freelance</p>
          </div>

          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                ...styles.alert,
                ...(alert.type === 'success' ? styles.alertSuccess : styles.alertError)
              }}
            >
              <span>{alert.message}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {})
                }}
                placeholder="exemple@email.com"
              />
              {errors.email && (
                <span style={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Mot de passe
              </label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
                    paddingRight: '50px'
                  }}
                  placeholder="Entrez votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
              {errors.password && (
                <span style={styles.errorMessage}>{errors.password}</span>
              )}
            </div>

            <div style={styles.formOptions}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} />
                <span>Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {})
              }}
            >
              {loading ? (
                <span style={styles.spinner}></span>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerText}>ou</span>
          </div>

          <div style={styles.socialButtons}>
            <button type="button" style={styles.socialButton}>
              <span>Continuer avec Google</span>
            </button>
            <button type="button" style={styles.socialButton}>
              <span>Continuer avec Facebook</span>
            </button>
          </div>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Pas encore de compte ?{' '}
              <Link to="/inscription" style={styles.signupLink}>
                Créer un compte
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Professional Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={styles.rightSection}
      >
        <div style={styles.imageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
            alt="Freelancer professionnel"
            style={styles.mainImage}
          />
          <div style={styles.imageOverlay}></div>
        </div>
        
        <div style={styles.infoContent}>
          <h2 style={styles.infoTitle}>Votre hub freelance professionnel</h2>
          <p style={styles.infoText}>
            Publiez vos projets, trouvez les meilleurs talents ou décrochez des missions.
            Tout pour réussir en freelance, en toute sécurité.
          </p>
          
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>100+</div>
              <div style={styles.statLabel}>Freelancers actifs</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>100+</div>
              <div style={styles.statLabel}>Projets réalisés</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>98%</div>
              <div style={styles.statLabel}>Satisfaction client</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
  },
  rightSection: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1a1a2e',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.3,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(59, 130, 246, 0.3) 100%)',
  },
  infoContent: {
    position: 'relative',
    zIndex: 1,
    color: '#ffffff',
  },
  authCard: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '48px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  },
  authHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  logoIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 24px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  authTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '12px',
  },
  authSubtitle: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.5',
  },
  alert: {
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '24px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  alertSuccess: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    border: '1px solid #10b981',
  },
  alertError: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #ef4444',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  passwordWrapper: {
    position: 'relative',
  },
  passwordToggle: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    padding: '4px 8px',
  },
  errorMessage: {
    fontSize: '13px',
    color: '#ef4444',
    marginTop: '4px',
  },
  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#374151',
  },
  checkbox: {
    cursor: 'pointer',
  },
  forgotLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  submitButtonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '32px 0',
  },
  dividerText: {
    padding: '0 16px',
    backgroundColor: '#ffffff',
    color: '#9ca3af',
    fontSize: '14px',
    position: 'relative',
    zIndex: 1,
  },
  socialButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  socialButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#374151',
  },
  footer: {
    textAlign: 'center',
    marginTop: '32px',
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  signupLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '600',
  },
  infoTitle: {
    fontSize: '42px',
    fontWeight: '700',
    marginBottom: '24px',
    lineHeight: '1.2',
  },
  infoText: {
    fontSize: '18px',
    lineHeight: '1.7',
    marginBottom: '48px',
    opacity: 0.9,
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.8,
    color: '#ffffff',
  },
};

export default ModernLoginPage;