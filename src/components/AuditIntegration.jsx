import React from 'react';
import { motion } from 'framer-motion';
import { FaNetworkWired, FaFolderOpen, FaCode, FaFileAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';

const AuditIntegration = () => {
    const accentColor = '#fbbf24'; // Amber/Yellow

    const audits = [
        {
            icon: <FaNetworkWired />,
            title: "Audit Réseau et Infrastructure",
            desc: "Analyse des configurations réseau (pare-feu, routeurs, serveurs) pour détecter des failles dans vos dispositifs techniques."
        },
        {
            icon: <FaFolderOpen />,
            title: "Audit de Configuration Active Directory",
            desc: "Identification des mauvaises pratiques et failles dans l'administration de votre domaine Active Directory."
        },
        {
            icon: <FaCode />,
            title: "Audit d'Application Web",
            desc: "Analyse approfondie des applications afin de détecter et corriger les vulnérabilités."
        }
    ];

    const accompagnement = [
        {
            icon: <FaFileAlt />,
            title: "Rapports Clairs et Exploitables",
            desc: "A l'issue de l'audit, vous recevez des documents complets mais accessibles, comprenant les failles identifiées, leur criticité et les actions correctives."
        },
        {
            icon: <FaUsers />,
            title: "Collaboration Active",
            desc: "Nous travaillons en étroite collaboration avec vos équipes techniques pour garantir des résultats exploitables et éviter tout impact sur vos opérations."
        },
        {
            icon: <FaCheckCircle />,
            title: "Suivi des Recommandations",
            desc: "Nous proposons un accompagnement dans la mise en œuvre de solutions pour corriger les vulnérabilités détectées."
        }
    ];

    return (
        <section id="audit" className="section">
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                    {/* Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ color: accentColor, fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>
                            Audit de Sécurité
                        </h2>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '30px' }}>
                            La sécurité de vos systèmes d'information est essentielle
                        </h3>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'start' }}>
                            <div style={{ flex: '1 1 500px' }}>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                                    La sécurité de vos systèmes d'information est essentielle pour garantir la continuité de vos activités et protéger vos données sensibles.
                                </p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                                    Bien plus qu'une simple vérification technique, il s'agit d'un processus stratégique visant à identifier les vulnérabilités, évaluer les risques et proposer des solutions concrètes pour sécuriser votre environnement numérique.
                                </p>
                                <p style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: '20px', color: 'var(--color-text-primary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    Notre service d'audit de sécurité repose sur une approche méthodique et rigoureuse pour vous fournir des solutions concrètes et adaptées.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Types d'Audits */}
                    <div>
                        <motion.h4
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '60px', textAlign: 'center' }}
                        >
                            Nos Types d'Audits
                        </motion.h4>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '40px'
                        }}>
                            {audits.map((audit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    style={{
                                        backgroundColor: 'var(--color-bg-secondary)',
                                        padding: '40px',
                                        borderRadius: '16px',
                                        border: '1px solid var(--color-border)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px'
                                    }}
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: `${accentColor}10`,
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.8rem',
                                        color: accentColor
                                    }}>
                                        {audit.icon}
                                    </div>
                                    <h5 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white' }}>{audit.title}</h5>
                                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{audit.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <a href="/contact" className="btn" style={{ 
                                backgroundColor: accentColor, 
                                color: '#1c1822',
                                border: 'none',
                                padding: '14px 32px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                boxShadow: `0 0 20px ${accentColor}40`,
                                display: 'inline-block',
                                textDecoration: 'none'
                            }}>
                                Nous contacter
                            </a>
                        </div>
                    </div>

                    {/* Accompagnement */}
                    <div style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        padding: '60px 40px',
                        borderRadius: '16px',
                        border: '1px solid var(--color-border)'
                    }}>
                        <h4 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '50px', textAlign: 'center' }}>
                            Un Accompagnement Transparent
                        </h4>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '40px'
                        }}>
                            {accompagnement.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.5 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                                >
                                    <div style={{ fontSize: '2rem', color: accentColor }}>
                                        {item.icon}
                                    </div>
                                    <h5 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{item.title}</h5>
                                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuditIntegration;
