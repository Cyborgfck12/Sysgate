import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { useResponsive } from '../hooks/useResponsive'; // Assurez-vous que ce hook existe
import emailjs from '@emailjs/browser';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
    FIELD_LIMITS,
    sanitizeField,
    containsSuspiciousContent,
    isValidEmail,
    isDisposableEmail,
    isValidName,
    isValidCompany,
    isLikelyLinkSpam,
    checkRateLimit,
    registerSubmission,
} from '../utils/security';

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
    const [hasSent, setHasSent] = useState(false);
    // Honeypot field: real users never fill this hidden input.
    // Bots typically fill every field, which lets us silently drop submissions.
    const honeypotRef = useRef(null);
    // Track when the form was first rendered. Submissions completed in < 2s
    // are almost certainly automated.
    const renderedAtRef = useRef(Date.now());

    const services = [
        'Infrastructure Sécurisée',
        'Pentest',
        'Audit de Sécurité',
        'Intégration de Solutions',
        'Autre'
    ];

    // Validate phone format (international, E.164)
    const validatePhone = (phone) => {
        if (!phone) return true; // Optional field
        return isValidPhoneNumber(phone);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const max = FIELD_LIMITS[name] ?? 500;
        const cleanValue = sanitizeField(value, max);

        setFormData((prev) => ({
            ...prev,
            [name]: cleanValue,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Nom
        if (!formData.nom.trim()) {
            newErrors.nom = 'Le nom est requis';
        } else if (!isValidName(formData.nom)) {
            newErrors.nom = 'Nom invalide (lettres, espaces, tirets uniquement)';
        }

        // Prénom
        if (!formData.prenom.trim()) {
            newErrors.prenom = 'Le prénom est requis';
        } else if (!isValidName(formData.prenom)) {
            newErrors.prenom = 'Prénom invalide (lettres, espaces, tirets uniquement)';
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Email invalide';
        } else if (isDisposableEmail(formData.email)) {
            newErrors.email = 'Les emails jetables ne sont pas acceptés';
        }

        // Téléphone (optionnel)
        if (formData.telephone && !validatePhone(formData.telephone)) {
            newErrors.telephone = 'Numéro de téléphone invalide';
        }

        // Entreprise (optionnel)
        if (formData.entreprise && !isValidCompany(formData.entreprise)) {
            newErrors.entreprise = "Nom d'entreprise invalide";
        }

        // Service
        if (!formData.service) {
            newErrors.service = 'Veuillez sélectionner un service';
        } else if (!services.includes(formData.service)) {
            newErrors.service = 'Service invalide';
        }

        // Message
        if (!formData.message.trim()) {
            newErrors.message = 'Le message est requis';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Le message doit contenir au moins 10 caractères';
        } else if (formData.message.length > FIELD_LIMITS.message) {
            newErrors.message = `Le message ne doit pas dépasser ${FIELD_LIMITS.message} caractères`;
        } else if (isLikelyLinkSpam(formData.message)) {
            newErrors.message = 'Trop de liens détectés dans le message';
        }

        // Last-line defense against any malformed payload that survived sanitization
        for (const key of Object.keys(formData)) {
            if (formData[key] && containsSuspiciousContent(formData[key])) {
                newErrors[key] = 'Contenu non autorisé détecté';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, telephone: value || '' });
        if (errors.telephone) {
            setErrors({ ...errors, telephone: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (hasSent || isSubmitting) return;

        // Honeypot: if filled, treat as bot. Pretend success to avoid feedback.
        if (honeypotRef.current && honeypotRef.current.value) {
            setHasSent(true);
            setSubmitStatus({
                type: 'success',
                message: 'Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.',
            });
            return;
        }

        // Time-based bot detection: humans need >2s to fill a form.
        if (Date.now() - renderedAtRef.current < 2000) {
            setHasSent(true);
            setSubmitStatus({
                type: 'success',
                message: 'Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.',
            });
            return;
        }

        if (!validateForm()) {
            return;
        }

        const rate = checkRateLimit();
        if (!rate.ok) {
            setSubmitStatus({ type: 'error', message: rate.reason });
            return;
        }

        const SERVICE_ID = 'service_p56pta4';
        const TEMPLATE_ID = 'template_jjnyok7';
        const PUBLIC_KEY = '7GjEYjcq9yQBbk-zC';

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    nom: sanitizeField(formData.nom, FIELD_LIMITS.nom),
                    prenom: sanitizeField(formData.prenom, FIELD_LIMITS.prenom),
                    email: sanitizeField(formData.email, FIELD_LIMITS.email),
                    telephone: formData.telephone
                        ? sanitizeField(formData.telephone, FIELD_LIMITS.telephone)
                        : 'Non renseigné',
                    entreprise: formData.entreprise
                        ? sanitizeField(formData.entreprise, FIELD_LIMITS.entreprise)
                        : 'Non renseignée',
                    service: sanitizeField(formData.service, FIELD_LIMITS.service),
                    message: sanitizeField(formData.message, FIELD_LIMITS.message),
                },
                PUBLIC_KEY
            );
            registerSubmission();
            
            setHasSent(true);
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
            // Determine the user-facing message based on the actual failure.
            const status = error?.status;
            const text = (error?.text || error?.message || '').toLowerCase();
            let message;

            if (!navigator.onLine) {
                message = 'Pas de connexion internet. Vérifiez votre réseau et réessayez.';
            } else if (status === 0 || text.includes('network') || text.includes('failed to fetch')) {
                message = 'Connexion au serveur impossible. Vérifiez votre connexion internet.';
            } else if (status === 400) {
                message = 'Certaines informations du formulaire sont invalides. Vérifiez vos champs.';
            } else if (status === 401 || status === 403) {
                message = "Service d'envoi temporairement indisponible. Réessayez dans quelques minutes.";
            } else if (status === 412 || text.includes('smtp') || text.includes('authentication')) {
                message = "Le serveur mail est temporairement indisponible. Réessayez plus tard ou contactez-nous directement à j.borri@sysgate.io.";
            } else if (status === 426 || text.includes('quota') || text.includes('limit')) {
                message = "Quota d'envoi atteint pour aujourd'hui. Réessayez demain ou écrivez directement à j.borri@sysgate.io.";
            } else if (status === 429) {
                message = 'Trop de tentatives. Patientez quelques minutes avant de réessayer.';
            } else if (status >= 500 && status < 600) {
                message = 'Le serveur rencontre un problème. Réessayez dans quelques minutes.';
            } else if (text.includes('timeout')) {
                message = 'La requête a pris trop de temps. Vérifiez votre connexion et réessayez.';
            } else {
                message = "L'envoi a échoué. Réessayez ou écrivez directement à j.borri@sysgate.io.";
            }

            setSubmitStatus({ type: 'error', message });
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
                                <ContactInfoItem icon={<FaEnvelope />} label="Email" value="j.borri@sysgate.io" />
                                <ContactInfoItem icon={<FaPhone />} label="Téléphone" value="07 85 84 05 40" />
                                <ContactInfoItem icon={<FaMapMarkerAlt />} label="Adresse" value="155 chemin du Rayol, 83490 Le Muy" />
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

                                    {/* Honeypot anti-bot field. Hidden from real users. */}
                                    <div
                                        aria-hidden="true"
                                        style={{
                                            position: 'absolute',
                                            left: '-10000px',
                                            top: 'auto',
                                            width: '1px',
                                            height: '1px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <label htmlFor="website">Ne pas remplir</label>
                                        <input
                                            ref={honeypotRef}
                                            type="text"
                                            name="website"
                                            id="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            defaultValue=""
                                        />
                                    </div>

                                    <div style={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                                        gap: '16px', 
                                        marginBottom: '16px' 
                                    }}>
                                        <div>
                                            <Input name="nom" placeholder="Nom *" value={formData.nom} onChange={handleChange} error={errors.nom} maxLength={FIELD_LIMITS.nom} autoComplete="family-name" />
                                            {errors.nom && <FieldError message={errors.nom} />}
                                        </div>
                                        <div>
                                            <Input name="prenom" placeholder="Prénom *" value={formData.prenom} onChange={handleChange} error={errors.prenom} maxLength={FIELD_LIMITS.prenom} autoComplete="given-name" />
                                            {errors.prenom && <FieldError message={errors.prenom} />}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '16px' }}>
                                        <Input name="email" type="email" placeholder="Email professionnel *" value={formData.email} onChange={handleChange} error={errors.email} maxLength={FIELD_LIMITS.email} autoComplete="email" inputMode="email" style={{ width: '100%' }} />
                                        {errors.email && <FieldError message={errors.email} />}
                                    </div>

                                    <div style={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                                        gap: '16px', 
                                        marginBottom: '16px' 
                                    }}>
                                        <div>
                                            <PhoneInput
                                                international
                                                defaultCountry="FR"
                                                value={formData.telephone}
                                                onChange={handlePhoneChange}
                                                placeholder="Téléphone"
                                                className="phone-input-dark"
                                                style={{
                                                    padding: '12px 18px',
                                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                                    border: errors.telephone ? '1px solid #ff3333' : '1px solid rgba(109, 40, 217, 0.15)',
                                                    borderRadius: '12px',
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    width: '100%',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                            {errors.telephone && <FieldError message={errors.telephone} />}
                                        </div>
                                        <div>
                                            <Input name="entreprise" placeholder="Entreprise" value={formData.entreprise} onChange={handleChange} error={errors.entreprise} maxLength={FIELD_LIMITS.entreprise} autoComplete="organization" />
                                            {errors.entreprise && <FieldError message={errors.entreprise} />}
                                        </div>
                                    </div>

                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '16px 18px',
                                            backgroundColor: '#1c1822',
                                            border: '1px solid rgba(109, 40, 217, 0.15)',
                                            borderRadius: '12px',
                                            color: formData.service ? 'white' : 'var(--color-text-muted)',
                                            fontSize: '16px',
                                            marginBottom: '16px',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            appearance: 'none',
                                            WebkitAppearance: 'none',
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 16px center'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(109, 40, 217, 0.5)';
                                            e.target.style.backgroundColor = 'rgba(109, 40, 217, 0.08)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(109, 40, 217, 0.08)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(109, 40, 217, 0.15)';
                                            e.target.style.backgroundColor = '#1c1822';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <option value="" style={{ backgroundColor: '#1c1822', color: '#9ca3af' }}>Service souhaité *</option>
                                        {errors.service && null}
                                        {services.map((service, index) => (
                                            <option key={index} value={service} style={{ backgroundColor: '#1c1822', color: '#ffffff', padding: '12px' }}>{service}</option>
                                        ))}
                                    </select>
                                    {errors.service && <FieldError message={errors.service} />}

                                    <textarea
                                        name="message"
                                        placeholder="Décrivez votre projet ou vos besoins *"
                                        required
                                        rows="5"
                                        maxLength={FIELD_LIMITS.message}
                                        value={formData.message}
                                        onChange={handleChange}
                                        spellCheck="true"
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
                                    {errors.message && <FieldError message={errors.message} />}

                                    <div style={{ textAlign: 'center' }}>
                                        <button
                                            type="submit"
                                            className="btn"
                                            disabled={isSubmitting || hasSent}
                                            style={{
                                                padding: '12px 28px',
                                                fontSize: '0.95rem',
                                                fontWeight: 600,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                background: hasSent 
                                                    ? 'linear-gradient(135deg, #10b981, #059669)' 
                                                    : (isSubmitting ? 'linear-gradient(135deg, #555, #444)' : 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))'),
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '9999px',
                                                cursor: hasSent || isSubmitting ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: hasSent ? '0 4px 12px rgba(16, 185, 129, 0.25)' : '0 4px 12px rgba(109, 40, 217, 0.25)',
                                                opacity: isSubmitting ? 0.7 : 1
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!hasSent && !isSubmitting) {
                                                    e.target.style.transform = 'translateY(-2px)';
                                                    e.target.style.boxShadow = '0 8px 20px rgba(109, 40, 217, 0.35)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!hasSent && !isSubmitting) {
                                                    e.target.style.transform = 'translateY(0)';
                                                    e.target.style.boxShadow = '0 4px 12px rgba(109, 40, 217, 0.25)';
                                                }
                                            }}
                                        >
                                            {hasSent ? (
                                                <><FaCheckCircle /> Message envoyé</>
                                            ) : isSubmitting ? (
                                                <>Envoi en cours...</>
                                            ) : (
                                                <><FaPaperPlane /> Envoyer le message</>
                                            )}
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

const FieldError = ({ message }) => (
    <p style={{
        color: '#ff3333',
        fontSize: '0.8rem',
        marginTop: '6px',
        marginLeft: '4px',
        fontWeight: 500
    }}>
        {message}
    </p>
);

const Input = ({ style, error, ...props }) => (
    <input
        {...props}
        style={{
            padding: '16px 18px',
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: error ? '1px solid #ff3333' : '1px solid rgba(109, 40, 217, 0.15)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            width: '100%',
            transition: 'all 0.3s ease',
            ...style
        }}
        onFocus={(e) => {
            e.target.style.borderColor = error ? '#ff3333' : 'rgba(109, 40, 217, 0.5)';
            e.target.style.backgroundColor = 'rgba(109, 40, 217, 0.05)';
            e.target.style.boxShadow = error ? '0 0 0 3px rgba(255, 51, 51, 0.08)' : '0 0 0 3px rgba(109, 40, 217, 0.08)';
        }}
        onBlur={(e) => {
            e.target.style.borderColor = error ? '#ff3333' : 'rgba(109, 40, 217, 0.15)';
            e.target.style.backgroundColor = 'rgba(255,255,255,0.03)';
            e.target.style.boxShadow = 'none';
        }}
    />
);

export default Contact;
