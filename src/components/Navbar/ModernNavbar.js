import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ModernNavbar.css';

const ModernNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for authentication changes
    const handleAuthChange = () => {
      checkAuth();
    };

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Close profile menu when clicking outside
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-wrapper')) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    setShowProfileMenu(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'freelance' || user.role === 'candidat') {
      return '/dashboard-freelance';
    } else if (user.role === 'client') {
      return '/dashboard-client';
    } else if (user.role === 'admin') {
      return '/admin-workspace';
    }
    return '/';
  };

  const navLinks = isAuthenticated
    ? [
        { path: '/', label: 'Accueil' },
        { path: getDashboardLink(), label: 'Mon Espace' },
        { path: '/formations', label: 'Formations' },
      ]
    : [
        { path: '/', label: 'Accueil' },
        { path: '/categories', label: 'Catégories' },
        { path: '/comment-ca-marche', label: 'Comment ça marche' },
        // { path: '/fonctionnalites', label: 'Fonctionnalités' },
      ];

  return (
    <nav className={`modern-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-wrapper">
            <div className="logo-icon"></div>
            <span className="logo-text">Tunisians Freelancers</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions desktop-only">
          {isAuthenticated ? (
            <div className="profile-wrapper">
              <button
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="Menu profil"
                aria-expanded={showProfileMenu}
              >
                <div className="profile-avatar">
                  {user?.photo ? (
                    <img src={user.photo} alt={user.nom || 'Avatar'} />
                  ) : (
                    <span>{user?.nom?.[0] || user?.email?.[0] || 'U'}</span>
                  )}
                </div>
                <span className="profile-name">{user?.nom || user?.prenom || 'Utilisateur'}</span>
                <svg className="profile-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="profile-menu"
                  >
                    <Link to="/profil" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                      <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Mon Profil</span>
                    </Link>
                    <Link to={getDashboardLink()} className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                      <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Tableau de bord</span>
                    </Link>
                    <div className="profile-menu-divider"></div>
                    <button className="profile-menu-item logout-item" onClick={handleLogout}>
                      <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Déconnexion</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/connexion" className="nav-button nav-button-secondary">
                Connexion
              </Link>
              <Link to="/inscription" className="nav-button nav-button-primary">
                Inscription
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="mobile-menu-divider"></div>
                  <Link
                    to="/profil"
                    className="mobile-menu-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mon Profil
                  </Link>
                  <button className="mobile-menu-link logout-link" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <div className="mobile-menu-divider"></div>
                  <Link
                    to="/connexion"
                    className="mobile-menu-button mobile-button-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/inscription"
                    className="mobile-menu-button mobile-button-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ModernNavbar;