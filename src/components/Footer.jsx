import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ 
            background: 'linear-gradient(to bottom, var(--color-bg-primary), var(--color-bg-secondary))', 
            padding: '80px 0 0', 
            borderTop: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative gradient blob */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(109, 40, 217, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '50px', 
                    marginBottom: '60px' 
                }}>
                    {/* Logo & Description */}
                    <div style={{ maxWidth: '350px' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <img 
                                src="/Image/logl12.webp" 
                                alt="Sysgate Logo" 
                                style={{ height: '70px', width: 'auto' }} 
                            />
                        </div>
                        <p style={{ 
                            color: 'var(--color-text-secondary)', 
                            marginBottom: '24px', 
                            lineHeight: '1.7',
                            fontSize: '0.95rem'
                        }}>
                            Votre partenaire de confiance en cybersécurité. Nous protégeons votre entreprise contre les menaces numériques avec expertise et innovation.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="#" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-text-muted)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                                e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'var(--color-text-muted)';
                            }}
                            >
                                <FaLinkedin size={18} />
                            </a>
                            <a href="#" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-text-muted)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                                e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'var(--color-text-muted)';
                            }}
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--color-text-muted)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-accent-primary)';
                                e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'var(--color-text-muted)';
                            }}
                            >
                                <FaGithub size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ 
                            color: 'white', 
                            marginBottom: '24px', 
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            letterSpacing: '0.5px'
                        }}>Nos Services</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                { name: 'Infrastructure Sécurisée', path: '/infrastructure', color: '#10b981' },
                                { name: 'Tests d\'Intrusion', path: '/pentest', color: '#ff3333' },
                                { name: 'Audit de Sécurité', path: '/audit', color: '#fbbf24' },
                                { name: 'Intégration de Solutions', path: '/integration', color: 'var(--color-accent-primary)' }
                            ].map((service, index) => (
                                <li key={index}>
                                    <Link 
                                        to={service.path}
                                        style={{ 
                                            color: 'var(--color-text-secondary)', 
                                            textDecoration: 'none',
                                            transition: 'color 0.3s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = service.color}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                                    >
                                        <span style={{ fontSize: '0.7rem' }}>▸</span>
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ 
                            color: 'white', 
                            marginBottom: '24px', 
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            letterSpacing: '0.5px'
                        }}>Contact</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                                <FaEnvelope style={{ color: 'var(--color-accent-primary)', marginTop: '4px', fontSize: '0.9rem' }} />
                                <a href="mailto:contact@sysgate.com" style={{ 
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'white'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
                                >
                                    contact@sysgate.com
                                </a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                                <FaPhone style={{ color: 'var(--color-accent-primary)', marginTop: '4px', fontSize: '0.9rem' }} />
                                <span style={{ color: 'var(--color-text-secondary)' }}>+33 1 23 45 67 89</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                                <FaMapMarkerAlt style={{ color: 'var(--color-accent-primary)', marginTop: '4px', fontSize: '0.9rem' }} />
                                <span style={{ color: 'var(--color-text-secondary)' }}>Paris, France</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ 
                    borderTop: '1px solid rgba(255,255,255,0.06)', 
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: '20px' 
                }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        © 2025 Sysgate Security. Tous droits réservés.
                    </p>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem' }}>
                        <a href="#" style={{ 
                            color: 'var(--color-text-muted)', 
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                        >
                            Mentions légales
                        </a>
                        <a href="#" style={{ 
                            color: 'var(--color-text-muted)', 
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'white'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                        >
                            Politique de confidentialité
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
