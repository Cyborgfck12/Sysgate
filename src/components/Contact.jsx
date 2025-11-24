import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ color: 'var(--color-accent-primary)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px' }}>CONTACT</h2>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>Parlons de votre Sécurité</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '30px' }}>Nos Coordonnées</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)' }}>
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Email</p>
                                    <p style={{ color: 'white', fontWeight: 'bold' }}>contact@sysgate.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)' }}>
                                    <FaPhone />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Téléphone</p>
                                    <p style={{ color: 'white', fontWeight: 'bold' }}>+33 1 23 45 67 89</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-primary)' }}>
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Adresse</p>
                                    <p style={{ color: 'white', fontWeight: 'bold' }}>Paris, France</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <input type="text" placeholder="Nom" style={{ padding: '15px', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'white' }} />
                            <input type="text" placeholder="Prénom" style={{ padding: '15px', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'white' }} />
                        </div>
                        <input type="email" placeholder="Email professionnel" style={{ padding: '15px', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'white' }} />
                        <select style={{ padding: '15px', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-muted)' }}>
                            <option>Sujet de la demande</option>
                            <option>Audit de sécurité</option>
                            <option>Pentest</option>
                            <option>Infrastructure</option>
                            <option>Autre</option>
                        </select>
                        <textarea placeholder="Message" rows="5" style={{ padding: '15px', backgroundColor: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'white' }}></textarea>
                        <button type="submit" className="btn btn-primary">Envoyer le message</button>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default Contact;
