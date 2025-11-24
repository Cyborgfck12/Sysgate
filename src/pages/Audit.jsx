import React from 'react';
import AuditIntegrationComp from '../components/AuditIntegration'; // Je devrai peut-être renommer ce composant plus tard
import { motion } from 'framer-motion';

const Audit = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: '80px' }}
        >
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                backgroundImage: 'url("/Image/audit.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden',
                marginBottom: '60px',
                marginTop: '40px',
            }}>
                {/* Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(28, 24, 34, 0.7)',
                    zIndex: 0
                }} />
                
                {/* Text Content */}
                <div className="container section" style={{ 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                    padding: '140px 20px',
                    minHeight: '450px',
                    justifyContent: 'center'
                }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.2rem', color: 'white', fontWeight: 800, lineHeight: '1.2' }}>
                        Audit de Sécurité
                    </h1>
                    <p style={{ 
                        color: 'var(--color-text-secondary)', 
                        maxWidth: '900px', 
                        marginBottom: '0',
                        fontSize: '1.4rem',
                        lineHeight: '1.6'
                    }}>
                        Analyse approfondie et méthodique pour évaluer vos risques.
                    </p>
                </div>
            </div>

            <AuditIntegrationComp /> 
        </motion.div>
    );
};

export default Audit;
