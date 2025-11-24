import React from 'react';
import { motion } from 'framer-motion';
import { FaNetworkWired, FaBug, FaClipboardCheck, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: <FaNetworkWired />,
        title: "Infrastructure",
        desc: "Sécurisée. Conception et optimisation d'architectures réseaux résilientes.",
        link: "/infrastructure",
        color: "#10b981", // Emerald/Green
        accentColor: "rgba(16, 185, 129, 0.2)"
    },
    {
        icon: <FaBug />,
        title: "Pentest",
        desc: "Tests d'intrusion White, Grey et Black Box pour identifier vos failles.",
        link: "/pentest",
        color: "#ff3333", // Red
        accentColor: "rgba(255, 51, 51, 0.2)"
    },
    {
        icon: <FaClipboardCheck />,
        title: "Audit de Sécurité",
        desc: "Analyse approfondie et méthodique pour évaluer vos risques.",
        link: "/audit",
        color: "#fbbf24", // Amber
        accentColor: "rgba(251, 191, 36, 0.2)"
    },
    {
        icon: <FaShieldAlt />,
        title: "Intégration de Solutions",
        desc: "Déploiement de technologies de pointe (SOAR, SIEM, EDR).",
        link: "/integration",
        color: "var(--color-accent-primary)", // Purple
        accentColor: "rgba(109, 40, 217, 0.2)"
    }
];

const Services = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{
            display: 'inline-flex',
            padding: '6px 12px',
            borderRadius: '9999px',
            border: '1px solid var(--color-border)',
            color: 'var(--color-accent-success)',
            fontSize: '0.8rem',
            letterSpacing: '1px'
          }}>NOS EXPERTISES</div>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', marginTop: '14px' }}>Une Protection Globale</h3>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>Des solutions adaptées à chaque étape de votre sécurité.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}
        >
          {services.map((service, index) => {
             const mainColor = service.color || 'var(--color-accent-primary)';
             const glowColor = service.accentColor || 'rgba(109, 40, 217, 0.2)';
             
             return (
            <motion.div key={index} variants={item} whileHover={{ y: -6 }}>
              {/* Gradient border wrapper */}
              <div style={{
                background: `linear-gradient(135deg, ${mainColor}, transparent)`,
                padding: '1px',
                borderRadius: '14px'
              }}>
                <div style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderRadius: '13px',
                  padding: '32px 24px',
                  height: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.04)',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.35)'
                }}>
                  {/* Icon pill */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: glowColor,
                    color: mainColor,
                    fontSize: '1.8rem',
                    marginBottom: '20px'
                  }}>
                    {service.icon}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '8px' }}>{service.title}</h4>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '18px', lineHeight: 1.6, flexGrow: 1 }}>{service.desc}</p>
                  <Link 
                    to={service.link} 
                    className="btn btn-outline" 
                    style={{ 
                      padding: '10px 20px', 
                      fontSize: '0.9rem', 
                      marginTop: 'auto',
                      color: 'white',
                      borderColor: 'var(--color-border)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      textDecoration: 'none'
                    }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = mainColor;
                      e.target.style.color = mainColor;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'var(--color-border)';
                      e.target.style.color = 'white';
                    }}
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            </motion.div>
          )})}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
