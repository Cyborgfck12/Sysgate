import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useResponsive } from '../hooks/useResponsive'; // Assurez-vous que ce hook existe

const Contact = () => {
    const { isMobile } = useResponsive();
    
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        entreprise: '',
        service: '',
        message: ''
    });

    const services = [
        'Infrastructure Sécurisée',
        'Pentest',
        'Audit de Sécurité',
        'Intégration de Solutions',
        'Autre'
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: '80px' }}
        >
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                backgroundImage: 'url("/Image/contact.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden',
                marginBottom: '60px',
                marginTop: '40px',
                paddingTop: isMobile ? '100px' : '0',
                paddingBottom: isMobile ? '60px' : '0'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(28, 24, 34, 0.7)',
                    zIndex: 0
                }} />

                <div className='container section' style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    maxWidth: '600px', 
                    margin: '0 auto', 
                    textAlign: 'center',
                    padding: isMobile ? '40px 20px' : '140px 20px',
                    minHeight: isMobile ? 'auto' : '450px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 style={{
                            fontSize: isMobile ? '2.5rem' : '3.5rem',
                            fontWeight: 900,
                            color: 'white',
                            lineHeight: '1.2',
                            letterSpacing: '-0.5px'
                        }}>
                            Contactez-nous
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Section Formulaire et Coordonnées */}
            <section className='section' style={{ backgroundColor: 'var(--color-bg-primary)', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className='container' style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', 
                        gap: '60px', 
                        alignItems: 'start' 
                    }}>
                        
                        {/* Colonne gauche - Coordonnées */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
                                Nos Coordonnées
                            </h3>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', lineHeight: '1.7' }}>
                                Contactez-nous directement ou remplissez le formulaire. Nous vous répondrons dans les plus brefs délais.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Items coordonnées... identique */}
                                <ContactInfoItem icon={<FaEnvelope />} label="Email" value="contact@sysgate.com" />
                                <ContactInfoItem icon={<FaPhone />} label="Téléphone" value="+33 1 23 45 67 89" />
                                <ContactInfoItem icon={<FaMapMarkerAlt />} label="Adresse" value="Paris, France" />
                            </div>
                        </motion.div>

                        {/* Colonne droite - Formulaire */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                                padding: '2px',
                                borderRadius: '16px'
                            }}>
                                <form onSubmit={handleSubmit} style={{
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    borderRadius: '14px',
                                    padding: isMobile ? '24px' : '40px',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}>
                                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '24px' }}>
                                        Envoyez-nous un message
                                    </h4>

                                    <div style={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                                        gap: '16px', 
                                        marginBottom: '16px' 
                                    }}>
                                        <Input name="nom" placeholder="Nom *" value={formData.nom} onChange={handleChange} />
                                        <Input name="prenom" placeholder="Prénom *" value={formData.prenom} onChange={handleChange} />
                                    </div>

                                    <Input name="email" type="email" placeholder="Email professionnel *" value={formData.email} onChange={handleChange} style={{ marginBottom: '16px', width: '100%' }} />

                                    <div style={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                                        gap: '16px', 
                                        marginBottom: '16px' 
                                    }}>
                                        <Input name="telephone" type="tel" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} />
                                        <Input name="entreprise" placeholder="Entreprise" value={formData.entreprise} onChange={handleChange} />
                                    </div>

                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            backgroundColor: 'var(--color-bg-primary)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '8px',
                                            color: formData.service ? 'white' : 'var(--color-text-muted)',
                                            fontSize: '16px', // No zoom iOS
                                            marginBottom: '16px',
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="">Service souhaité *</option>
                                        {services.map((service, index) => (
                                            <option key={index} value={service}>{service}</option>
                                        ))}
                                    </select>

                                    <textarea
                                        name="message"
                                        placeholder="Décrivez votre projet ou vos besoins *"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            backgroundColor: 'var(--color-bg-primary)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontSize: '16px', // No zoom iOS
                                            marginBottom: '24px',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px'
                                        }}
                                    >
                                        <FaPaperPlane /> Envoyer le message
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </motion.div>
    );
};

// Petits composants helpers pour alléger le code
const ContactInfoItem = ({ icon, label, value }) => (
    <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '20px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'white',
            fontSize: '1.2rem',
            flexShrink: 0
        }}>
            {icon}
        </div>
        <div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{label}</p>
            <p style={{ color: 'white', fontWeight: 600, fontSize: '1.05rem' }}>{value}</p>
        </div>
    </div>
);

const Input = ({ style, ...props }) => (
    <input
        {...props}
        style={{
            padding: '14px 16px',
            backgroundColor: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px', // No zoom iOS
            outline: 'none',
            width: '100%',
            ...style
        }}
    />
);

export default Contact;
