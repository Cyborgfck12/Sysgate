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

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const services = [
        'Infrastructure Sécurisée',
        'Pentest',
        'Audit de Sécurité',
        'Intégration de Solutions',
        'Autre'
    ];

    // Sanitize input to prevent XSS
    const sanitizeInput = (input) => {
        return input
            .replace(/[<>]/g, '') // Remove < and >
            .trim();
    };

    // Validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate phone format (French)
    const validatePhone = (phone) => {
        if (!phone) return true; // Optional field
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = sanitizeInput(value);
        
        setFormData({
            ...formData,
            [name]: sanitizedValue
        });

        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Required fields
        if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
        if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        if (!formData.service) newErrors.service = 'Veuillez sélectionner un service';
        if (!formData.message.trim()) {
            newErrors.message = 'Le message est requis';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Le message doit contenir au moins 10 caractères';
        }

        // Optional phone validation
        if (formData.telephone && !validatePhone(formData.telephone)) {
            newErrors.telephone = 'Numéro de téléphone invalide';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setSubmitStatus({ type: 'error', message: 'Veuillez corriger les erreurs dans le formulaire' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Form submitted securely:', formData);
            
            setSubmitStatus({ 
                type: 'success', 
                message: 'Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.' 
            });
            
            // Reset form
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                entreprise: '',
                service: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus({ 
                type: 'error', 
                message: 'Une erreur est survenue. Veuillez réessayer.' 
            });
        } finally {
            setIsSubmitting(false);
        }
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
                                background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(109, 40, 217, 0.02))',
                                padding: '2px',
                                borderRadius: '20px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                            }}>
                                <form onSubmit={handleSubmit} style={{
                                    backgroundColor: 'rgba(28, 24, 34, 0.95)',
                                    borderRadius: '18px',
                                    padding: isMobile ? '32px 24px' : '50px 40px',
                                    border: '1px solid rgba(109, 40, 217, 0.12)',
                                    backdropFilter: 'blur(20px)'
                                }}>
                                    {/* Logo et titre */}
                                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                                        <img 
                                            src="/Image/logl12.webp" 
                                            alt="Sysgate Logo" 
                                            style={{ 
                                                height: '60px', 
                                                width: 'auto',
                                                marginBottom: '20px'
                                            }} 
                                        />
                                        <h4 style={{ 
                                            fontSize: '1.8rem', 
                                            fontWeight: 800, 
                                            color: 'white', 
                                            marginBottom: '8px',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            Demande de Contact
                                        </h4>
                                        <p style={{ 
                                            color: 'var(--color-text-secondary)', 
                                            fontSize: '0.95rem',
                                            lineHeight: '1.5'
                                        }}>
                                            Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
                                        </p>
                                    </div>

                                    {/* Status Message */}
                                    {submitStatus && (
                                        <div style={{
                                            padding: '16px',
                                            borderRadius: '12px',
                                            marginBottom: '24px',
                                            backgroundColor: submitStatus.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 51, 51, 0.1)',
                                            border: `1px solid ${submitStatus.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 51, 51, 0.3)'}`,
                                            color: submitStatus.type === 'success' ? '#10b981' : '#ff3333',
                                            textAlign: 'center',
                                            fontSize: '0.95rem'
                                        }}>
                                            {submitStatus.message}
                                        </div>
                                    )}

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
                                            padding: '16px 18px',
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(109, 40, 217, 0.15)',
                                            borderRadius: '12px',
                                            color: formData.service ? 'white' : 'var(--color-text-muted)',
                                            fontSize: '16px',
                                            marginBottom: '16px',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(109, 40, 217, 0.5)';
                                            e.target.style.backgroundColor = 'rgba(109, 40, 217, 0.05)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(109, 40, 217, 0.15)';
                                            e.target.style.backgroundColor = 'rgba(255,255,255,0.03)';
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
                                            padding: '16px 18px',
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(109, 40, 217, 0.15)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '16px',
                                            marginBottom: '28px',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                            transition: 'all 0.3s ease',
                                            minHeight: '140px'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(109, 40, 217, 0.5)';
                                            e.target.style.backgroundColor = 'rgba(109, 40, 217, 0.05)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(109, 40, 217, 0.08)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(109, 40, 217, 0.15)';
                                            e.target.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />

                                    <div style={{ textAlign: 'center' }}>
                                        <button
                                            type="submit"
                                            className="btn"
                                            style={{
                                                padding: '12px 28px',
                                                fontSize: '0.95rem',
                                                fontWeight: 600,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '9999px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(109, 40, 217, 0.25)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 8px 20px rgba(109, 40, 217, 0.35)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = '0 4px 12px rgba(109, 40, 217, 0.25)';
                                            }}
                                        >
                                            <FaPaperPlane /> Envoyer le message
                                        </button>
                                    </div>
                                    
                                    <p style={{ 
                                        textAlign: 'center', 
                                        marginTop: '20px', 
                                        color: 'var(--color-text-muted)', 
                                        fontSize: '0.85rem',
                                        lineHeight: '1.5'
                                    }}>
                                        En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous recontacter.
                                    </p>
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
            padding: '16px 18px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(109, 40, 217, 0.15)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            width: '100%',
            transition: 'all 0.3s ease',
            ...style
        }}
        onFocus={(e) => {
            e.target.style.borderColor = 'rgba(109, 40, 217, 0.5)';
            e.target.style.backgroundColor = 'rgba(109, 40, 217, 0.05)';
            e.target.style.boxShadow = '0 0 0 3px rgba(109, 40, 217, 0.08)';
        }}
        onBlur={(e) => {
            e.target.style.borderColor = 'rgba(109, 40, 217, 0.15)';
            e.target.style.backgroundColor = 'rgba(255,255,255,0.03)';
            e.target.style.boxShadow = 'none';
        }}
    />
);

export default Contact;
