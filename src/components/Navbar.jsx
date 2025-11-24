import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronRight } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        document.body.style.overflow = 'unset'; // Réactiver le scroll
    }, [location]);

    // Bloquer le scroll quand le menu est ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const services = [
        { name: 'Infrastructure', path: '/infrastructure' },
        { name: 'Pentest', path: '/pentest' },
        { name: 'Audit', path: '/audit' },
        { name: 'Intégration', path: '/integration' },
    ];

    const getHoverColor = (serviceName) => {
        if (serviceName === 'Pentest') return 'var(--color-accent-alert)';
        if (serviceName === 'Audit') return '#fbbf24';
        if (serviceName === 'Intégration') return 'var(--color-accent-primary)';
        return 'var(--color-accent-success)';
    };

    // Animation variants for mobile menu
    const menuVariants = {
        closed: { opacity: 0, x: "100%" },
        open: { 
            opacity: 1, 
            x: 0,
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: scrolled ? '1rem 0' : '1.5rem 0',
                backgroundColor: scrolled || isOpen ? 'rgba(28, 24, 34, 0.95)' : 'transparent',
                backdropFilter: scrolled || isOpen ? 'blur(15px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {/* Left: Logo */}
                <Link 
                    to="/" 
                    style={{ display: 'flex', alignItems: 'center', zIndex: 1002, position: 'absolute', left: '20px' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <img src="/Image/logl12.webp" alt="Sysgate Logo" style={{ height: scrolled || isOpen ? '65px' : '80px', width: 'auto', transition: 'height 0.3s ease' }} />
                </Link>

                {/* Desktop Menu - Centered */}
                <div className="desktop-menu" style={{ justifyContent: 'center' }}>
                    {services.map((service) => (
                        <Link
                            key={service.name}
                            to={service.path}
                            style={{
                                color: location.pathname === service.path ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                transition: 'color 0.3s ease',
                                position: 'relative',
                                display: 'inline-block',
                                paddingBottom: '8px'
                            }}
                            onMouseEnter={(e) => e.target.style.color = getHoverColor(service.name)}
                            onMouseLeave={(e) => e.target.style.color = location.pathname === service.path ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'}
                        >
                            {service.name}
                            {location.pathname === service.path && (
                                <motion.div
                                    layoutId="underline"
                                    style={{
                                        position: 'absolute',
                                        bottom: '0px',
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        backgroundColor: getHoverColor(service.name)
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right: Contact Button */}
                <Link to="/contact" className="btn btn-primary desktop-menu" style={{ padding: '8px 20px', fontSize: '0.9rem', position: 'absolute', right: '20px' }}>
                    Nous Contacter
                </Link>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-btn" 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ 
                        zIndex: 1002, 
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                        transition: 'background-color 0.3s ease',
                        position: 'absolute',
                        right: '20px'
                    }}
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(135deg, rgba(28, 24, 34, 0.98) 0%, rgba(20, 18, 26, 0.98) 100%)',
                                backdropFilter: 'blur(20px)',
                                paddingTop: '120px',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                                zIndex: 1000,
                                height: '100vh',
                                overflowY: 'auto'
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {/* Services Section */}
                                <motion.div variants={linkVariants}>
                                    <div
                                        onClick={() => setServicesOpen(!servicesOpen)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '18px 20px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <span>Services</span>
                                        <FaChevronRight 
                                            size={14} 
                                            style={{ 
                                                transform: servicesOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease',
                                                opacity: 0.6
                                            }} 
                                        />
                                    </div>
                                    
                                    {/* Services Dropdown */}
                                    <AnimatePresence>
                                        {servicesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ overflow: 'hidden', marginTop: '8px' }}
                                            >
                                                {services.map((service) => (
                                                    <Link
                                                        key={service.name}
                                                        to={service.path}
                                                        style={{
                                                            display: 'block',
                                                            padding: '14px 20px 14px 32px',
                                                            color: location.pathname === service.path ? getHoverColor(service.name) : 'var(--color-text-secondary)',
                                                            fontSize: '0.95rem',
                                                            textDecoration: 'none',
                                                            borderLeft: location.pathname === service.path ? `3px solid ${getHoverColor(service.name)}` : '3px solid transparent',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            setServicesOpen(false);
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                    >
                                                        {service.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Contact Link */}
                                <motion.div variants={linkVariants}>
                                    <Link 
                                        to="/contact" 
                                        style={{ 
                                            display: 'block',
                                            padding: '18px 20px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            textDecoration: 'none',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={() => {
                                            setIsOpen(false);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    >
                                        Contact
                                    </Link>
                                </motion.div>
                            </div>
                            
                            <motion.div variants={linkVariants} style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', opacity: 0.7 }}>© 2025 Sysgate Security</p>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '8px', opacity: 0.5 }}>Votre partenaire cybersécurité</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
