import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <h1>
                            Protégez votre entreprise <br />
                            <span>contre les menaces cyber</span>
                        </h1>
                        <p className="hero-description">
                            Solutions de cybersécurité sur mesure: audit, pentest et surveillance continue. Sécurisez vos systèmes, vos données et votre réputation.
                        </p>
  
                        <p className="hero-trust-text">
                            Intervention rapide et confidentielle • Conformité et sécurité renforcées • Support 24/7 • Experts certifiés
                        </p>

                        <div className="hero-actions">
                            <a href="#services" className="btn btn-primary">
                                Sécuriser mon entreprise <FaArrowRight />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="hero-image-container"
                    >
                        <div className="hero-image-wrapper">
                            <img
                                src="/Image/logo.png"
                                alt="Sysgate"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Logo Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="hero-marquee"
                >
                    <p className="marquee-title">
                        Ils nous ont fait confiance
                    </p>
                    <div className="marquee-container">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                duration: 30,
                                ease: "linear"
                            }}
                            className="marquee-track"
                        >
                            {[
                                "/Image/Logoref/Design.png",
                                "/Image/Logoref/Guardia.png",
                                "/Image/Logoref/Ibox.png",
                                "/Image/Logoref/Ipssi.png",
                                "/Image/Logoref/Phi.png",
                                "/Image/Logoref/Protect.png",
                                "/Image/Logoref/Spoof.png",
                                "/Image/Logoref/Wild.png",
                                "/Image/Logoref/tennis.png",
                                "/Image/Logoref/Design.png",
                                "/Image/Logoref/Guardia.png",
                                "/Image/Logoref/Ibox.png",
                                "/Image/Logoref/Ipssi.png",
                                "/Image/Logoref/Phi.png",
                                "/Image/Logoref/Protect.png",
                                "/Image/Logoref/Spoof.png",
                                "/Image/Logoref/Wild.png",
                                "/Image/Logoref/tennis.png"
                            ].map((logo, i) => (
                                <img
                                    key={i}
                                    src={logo}
                                    alt="Partner Logo"
                                    className="marquee-logo"
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
