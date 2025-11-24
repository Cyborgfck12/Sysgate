import React from 'react';
import { FaAward, FaUserTie, FaHandshake } from 'react-icons/fa';

const About = () => {
  // Trust logos are displayed only on the Home page (Hero marquee)

  return (
    <section id="expertise" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', alignItems: 'start' }}>

          {/* Left: Content */}
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              padding: '6px 12px',
              borderRadius: '9999px',
              border: '1px solid var(--color-border)',
              color: 'var(--color-accent-success)',
              fontSize: '0.8rem',
              letterSpacing: '1px',
              marginBottom: '10px'
            }}>À PROPOS</div>
            <h3 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', marginBottom: '20px' }}>
              Qu’est ce qui nous distingue?
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <FaUserTie style={{ fontSize: '1.8rem', color: 'var(--color-accent-primary)' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '2px' }}>Experts Qualifiés</h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '640px' }}>Notre équipe est composée d’experts hautement qualifiés, chacun spécialisé dans son domaine avec une vaste expérience.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <FaAward style={{ fontSize: '1.8rem', color: 'var(--color-accent-primary)' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '2px' }}>Méthodes Éprouvées</h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '640px' }}>Nous utilisons des méthodes éprouvées et assurons un haut niveau d’exigence à chaque mission.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <FaHandshake style={{ fontSize: '1.8rem', color: 'var(--color-accent-primary)' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '2px' }}>Solutions Adaptées</h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '640px' }}>Des solutions sur mesure pour répondre aux besoins spécifiques de chaque client.</p>
              </div>
            </div>
          </div>

          {/* Right block removed as requested */}

        </div>
      </div>
    </section>
  );
};

export default About;
