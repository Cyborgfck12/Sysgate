import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            <Services />
            <About />
            {/* Bottom CTA */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', paddingTop: '60px', paddingBottom: '80px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h3 style={{ color: 'white', fontWeight: 800, fontSize: '2rem', marginBottom: '12px' }}>Contactez-nous</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                        Parlez-nous de vos enjeux sécurité. Nous revenons vers vous rapidement.
                    </p>
                    <Link 
                        to="/contact" 
                        className="btn btn-primary" 
                        style={{ padding: '10px 20px', fontSize: '0.95rem' }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Nous contacter
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
