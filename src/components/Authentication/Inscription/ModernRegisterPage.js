import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ModernRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidat',
    telephone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    if (!formData.nom) {
      newErrors.nom = 'Nom requis';
    }
    
    if (!formData.prenom) {
      newErrors.prenom = 'Prénom requis';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (formData.telephone && !/^\d{8,}$/.test(formData.telephone)) {
      newErrors.telephone = 'Numéro invalide (min 8 chiffres)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await axios.post('http://localhost:8001/api/register', {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        mdp: formData.password,
        role: formData.role,
        telephone: formData.telephone
      });

      setAlert({ type: 'success', message: 'Inscription réussie ! Redirection...' });
      
      setTimeout(() => {
        navigate('/connexion');
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setAlert({ 
        type: 'error', 
        message: error.response?.data?.message || 'Erreur lors de l\'inscription. Email peut-être déjà utilisé.' 
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

      <div style={styles.leftSection}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.authCard}
        >
          <div style={styles.authHeader}>
            <div style={styles.logoIcon}>FL</div>
            <h1 style={styles.authTitle}>Rejoignez-nous gratuitement</h1>
            <p style={styles.authSubtitle}>Commencez à publier ou décrocher des projets freelance</p>
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

          <div style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Je souhaite</label>
              <div style={styles.roleSelector}>
                <label style={{
                  ...styles.roleOption,
                  ...(formData.role === 'candidat' ? styles.roleSelected : {})
                }}>
                  <input
                    type="radio"
                    name="role"
                    value="candidat"
                    checked={formData.role === 'candidat'}
                    onChange={handleChange}
                    style={styles.radioInput}
                  />
                  <span style={styles.roleLabel}>Trouver des missions</span>
                </label>
                <label style={{
                  ...styles.roleOption,
                  ...(formData.role === 'client' ? styles.roleSelected : {})
                }}>
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={formData.role === 'client'}
                    onChange={handleChange}
                    style={styles.radioInput}
                  />
                  <span style={styles.roleLabel}>Recruter des freelances</span>
                </label>
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroupHalf}>
                <label htmlFor="nom" style={styles.label}>Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.nom ? styles.inputError : {})
                  }}
                  placeholder="Votre nom"
                />
                {errors.nom && <span style={styles.errorMessage}>{errors.nom}</span>}
              </div>

              <div style={styles.formGroupHalf}>
                <label htmlFor="prenom" style={styles.label}>Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.prenom ? styles.inputError : {})
                  }}
                  placeholder="Votre prénom"
                />
                {errors.prenom && <span style={styles.errorMessage}>{errors.prenom}</span>}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Adresse email</label>
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
              {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="telephone" style={styles.label}>
                Téléphone <span style={styles.optionalLabel}>(optionnel)</span>
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.telephone ? styles.inputError : {})
                }}
                placeholder="12345678"
              />
              {errors.telephone && <span style={styles.errorMessage}>{errors.telephone}</span>}
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroupHalf}>
                <label htmlFor="password" style={styles.label}>Mot de passe</label>
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
                      paddingRight: '70px'
                    }}
                    placeholder="Min 6 caractères"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                  >
                    {showPassword ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
                {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
              </div>

              <div style={styles.formGroupHalf}>
                <label htmlFor="confirmPassword" style={styles.label}>Confirmer</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      ...(errors.confirmPassword ? styles.inputError : {}),
                      paddingRight: '70px'
                    }}
                    placeholder="Répéter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.passwordToggle}
                  >
                    {showConfirmPassword ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
                {errors.confirmPassword && <span style={styles.errorMessage}>{errors.confirmPassword}</span>}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" required style={styles.checkbox} />
                <span style={styles.termsText}>
                  J'accepte les{' '}
                  <Link to="/terms" style={styles.termsLink}>conditions d'utilisation</Link>
                  {' '}et la{' '}
                  <Link to="/privacy" style={styles.termsLink}>politique de confidentialité</Link>
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {})
              }}
            >
              {loading ? (
                <span style={styles.spinner}></span>
              ) : (
                <span>Créer mon compte</span>
              )}
            </button>
          </div>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Vous avez déjà un compte ?{' '}
              <Link to="/connexion" style={styles.signupLink}>
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={styles.rightSection}
      >
        <div style={styles.imageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
            alt="Équipe freelance professionnelle"
            style={styles.mainImage}
          />
          <div style={styles.imageOverlay}></div>
        </div>
        
        <div style={styles.infoContent}>
          <h2 style={styles.infoTitle}>Propulsez votre carrière freelance</h2>
          <p style={styles.infoText}>
            Des milliers de clients et freelances utilisent déjà notre plateforme pour collaborer,
            développer leurs projets et faire grandir leur business.
          </p>
          
          <div style={styles.featuresContainer}>
            <div style={styles.featureItem}>
              <div style={styles.featureBullet}></div>
              <span style={styles.featureText}>Inscription gratuite sans engagement</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureBullet}></div>
              <span style={styles.featureText}>Accès illimité aux projets et talents</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureBullet}></div>
              <span style={styles.featureText}>Protection financière garantie</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureBullet}></div>
              <span style={styles.featureText}>Équipe support réactive et disponible</span>
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
    overflowY: 'auto',
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
    maxWidth: '580px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '48px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    marginBottom: '20px',
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
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  formGroupHalf: {
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
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 8px',
  },
  errorMessage: {
    fontSize: '13px',
    color: '#ef4444',
    marginTop: '4px',
  },
  optionalLabel: {
    fontSize: '13px',
    fontWeight: '400',
    color: '#9ca3af',
  },
  roleSelector: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  roleOption: {
    padding: '16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  roleSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  roleLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  radioInput: {
    display: 'none',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#374151',
  },
  checkbox: {
    cursor: 'pointer',
    marginTop: '2px',
  },
  termsText: {
    lineHeight: '1.6',
  },
  termsLink: {
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
    marginTop: '8px',
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
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  featureBullet: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    flexShrink: 0,
  },
  featureText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#ffffff',
  },
};

export default ModernRegisterPage;