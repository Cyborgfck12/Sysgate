import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaDraftingCompass, FaCogs, FaUsers, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const IntegrationComp = () => {
    const accentColor = '#6d28d9'; // Purple

    const steps = [
        {
            icon: <FaSearch />,
            title: "Évaluation des besoins",
            desc: "Nous identifions vos points faibles et définissons vos objectifs de sécurité."
        },
        {
            icon: <FaDraftingCompass />,
            title: "Choix de la solution",
            desc: "Nous sélectionnons les outils adaptés à intégrer à votre infrastructure existante."
        },
        {
            icon: <FaCogs />,
            title: "Implémentation",
            desc: "Nos experts déploient et configurent les solutions de sécurité dans votre environnement informatique."
        },
        {
            icon: <FaUsers />,
            title: "Formation et transfert de compétences",
            desc: "Nous formons vos équipes pour exploiter pleinement les outils intégrés."
        },
        {
            icon: <FaTools />,
            title: "Maintenance et suivi",
            desc: "Nous vous garantissons un support technique continu pour garantir l'efficacité et l'évolution de vos solutions."
        }
    ];

    const services = [
        "SOAR (Security Orchestration, Automation, and Response)",
        "IPS (Intrusion Prevention System) & IDS (Intrusion Detection System)",
        "SIEM (Security Information and Event Management)",
        "Endpoint Detection and Response (EDR)",
        "Firewall de nouvelle génération (NGFW)",
        "Web Application Firewall (WAF)"
    ];

    return (
        <section id="integration" className="section">
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                    {/* Header / Approach */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ color: accentColor, fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px', textTransform: 'uppercase' }}>
                            Intégration
                        </h2>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '30px' }}>
                            Renforcez votre infrastructure avec des solutions avancées
                        </h3>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'start' }}>
                            <div style={{ flex: '1 1 500px' }}>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                                    Notre approche d'intégration de solutions de sécurité repose sur une méthodologie rigoureuse et éprouvée.
                                </p>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                                    Après une analyse approfondie de vos besoins en cybersécurité, de votre environnement existant et des menaces spécifiques auxquelles vous êtes confrontés, nous déployons des solutions de sécurité adaptées en intégrant les technologies les plus récentes et en respectant les standards de sécurité les plus exigeants.
                                </p>
                                <p style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: '20px', color: 'var(--color-text-primary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                    Tout au long du processus, nous vous fournissons des rapports réguliers sur l'état d'avancement, les résultats obtenus et les éventuels défis rencontrés. Nous adoptons une approche collaborative et agile, vous impliquant activement à chaque étape pour garantir une solution sur mesure parfaitement alignée avec vos attentes et vos objectifs.
                                </p>
                            </div>
                            
                            {/* Services List */}
                            <div style={{ 
                                flex: '1 1 400px',
                                backgroundColor: 'var(--color-bg-secondary)', 
                                padding: '40px', 
                                borderRadius: '16px', 
                                border: '1px solid var(--color-border)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}>
                                <h4 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '25px', fontWeight: 'bold' }}>Technologies Intégrées</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {services.map((service, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'start', gap: '15px', color: 'var(--color-text-secondary)' }}>
                                            <span style={{ color: accentColor, fontSize: '1.2rem', marginTop: '2px', minWidth: '20px' }}>•</span>
                                            <span>{service}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div style={{ marginTop: '40px', textAlign: 'center' }}>
                            <Link to='/contact' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='btn btn-primary' 
                                    style={{ 
                                        padding: '12px 24px', 
                                        fontSize: '1rem',
                                        backgroundColor: accentColor,
                                        borderColor: accentColor,
                                        borderRadius: '9999px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Demander un devis
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Process Steps */}
                    <div>
                        <motion.h4
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '60px', textAlign: 'center' }}
                        >
                            Notre démarche d'intégration
                        </motion.h4>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '40px',
                            position: 'relative'
                        }}>
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    style={{ 
                                        position: 'relative', 
                                        zIndex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        backgroundColor: `${accentColor}10`,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        color: accentColor,
                                        marginBottom: '25px',
                                        border: `1px solid ${accentColor}30`
                                    }}>
                                        {step.icon}
                                    </div>
                                    <h5 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '15px' }}>{step.title}</h5>
                                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntegrationComp;
