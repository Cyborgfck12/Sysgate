import DOMPurify from 'dompurify';

/**
 * Centralized security utilities for input sanitization, validation,
 * and abuse prevention (rate limiting, honeypot detection).
 */

// Hard limits to prevent DoS via oversized payloads
export const FIELD_LIMITS = {
    nom: 80,
    prenom: 80,
    email: 254,         // RFC 5321
    telephone: 25,
    entreprise: 120,
    service: 60,
    message: 3000,
};

// Patterns that indicate likely injection or spam
const SUSPICIOUS_PATTERNS = [
    /<script[\s\S]*?>/i,
    /<\/script>/i,
    /javascript:/i,
    /data:text\/html/i,
    /on\w+\s*=/i,           // inline event handlers like onclick=
    /<iframe[\s\S]*?>/i,
    /<embed[\s\S]*?>/i,
    /<object[\s\S]*?>/i,
];

// Strip every HTML tag and entity. Returned value is plain text.
export const sanitizeText = (input) => {
    if (typeof input !== 'string') return '';
    const stripped = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
        KEEP_CONTENT: true,
    });
    return stripped.replace(/[\u0000-\u001F\u007F]/g, '');
};

// Hard cap a string length
export const clampLength = (input, max) => {
    if (typeof input !== 'string') return '';
    return input.length > max ? input.slice(0, max) : input;
};

// Sanitize + clamp in one pass for form fields
export const sanitizeField = (input, max) => clampLength(sanitizeText(input), max);

// Reject inputs that contain suspicious payloads
export const containsSuspiciousContent = (input) => {
    if (typeof input !== 'string') return false;
    return SUSPICIOUS_PATTERNS.some((rx) => rx.test(input));
};

// Strict email validation (RFC-ish, no unicode tricks)
export const isValidEmail = (email) => {
    if (typeof email !== 'string') return false;
    if (email.length > FIELD_LIMITS.email) return false;
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}$/;
    return re.test(email);
};

// Block disposable / common throwaway domains
const DISPOSABLE_DOMAINS = new Set([
    'mailinator.com',
    'yopmail.com',
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'trashmail.com',
    'sharklasers.com',
    'getnada.com',
]);

export const isDisposableEmail = (email) => {
    if (!isValidEmail(email)) return false;
    const domain = email.split('@')[1].toLowerCase();
    return DISPOSABLE_DOMAINS.has(domain);
};

// Names: only letters, spaces, hyphens, apostrophes (Unicode aware)
export const isValidName = (name) => {
    if (typeof name !== 'string') return false;
    if (name.length < 2 || name.length > FIELD_LIMITS.nom) return false;
    return /^[\p{L}\p{M}][\p{L}\p{M}\s'\-]{0,79}$/u.test(name.trim());
};

// Company names: letters, digits, spaces, basic punctuation
export const isValidCompany = (value) => {
    if (typeof value !== 'string') return true;
    if (value.length === 0) return true;
    if (value.length > FIELD_LIMITS.entreprise) return false;
    return /^[\p{L}\p{N}\p{M}\s'&,.\-]{0,120}$/u.test(value);
};

// Reject messages that look like link-spam (>=3 URLs)
export const isLikelyLinkSpam = (message) => {
    if (typeof message !== 'string') return false;
    const urlMatches = message.match(/https?:\/\/|www\./gi);
    return urlMatches && urlMatches.length >= 3;
};

// ---------- Rate limiting ----------
// Client-side throttle: best-effort defense against accidental spam.
// True abuse must be blocked server-side (EmailJS allowlist + reCAPTCHA).
const RATE_LIMIT_KEY = 'sysgate_contact_last_submit';
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 submission / minute
const HOURLY_KEY = 'sysgate_contact_hourly';
const HOURLY_LIMIT = 5;
const HOURLY_WINDOW_MS = 60 * 60 * 1000;

export const checkRateLimit = () => {
    try {
        const now = Date.now();
        const last = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || '0', 10);
        if (last && now - last < RATE_LIMIT_WINDOW_MS) {
            const wait = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - last)) / 1000);
            return { ok: false, reason: `Veuillez patienter ${wait}s avant un nouvel envoi.` };
        }
        const hourlyRaw = localStorage.getItem(HOURLY_KEY);
        let hourly = hourlyRaw ? JSON.parse(hourlyRaw) : { start: now, count: 0 };
        if (now - hourly.start > HOURLY_WINDOW_MS) {
            hourly = { start: now, count: 0 };
        }
        if (hourly.count >= HOURLY_LIMIT) {
            return { ok: false, reason: 'Limite horaire atteinte. Réessayez plus tard.' };
        }
        return { ok: true };
    } catch {
        // localStorage may be unavailable (private mode); fail-open with no throttle
        return { ok: true };
    }
};

export const registerSubmission = () => {
    try {
        const now = Date.now();
        localStorage.setItem(RATE_LIMIT_KEY, String(now));
        const hourlyRaw = localStorage.getItem(HOURLY_KEY);
        let hourly = hourlyRaw ? JSON.parse(hourlyRaw) : { start: now, count: 0 };
        if (now - hourly.start > HOURLY_WINDOW_MS) {
            hourly = { start: now, count: 0 };
        }
        hourly.count += 1;
        localStorage.setItem(HOURLY_KEY, JSON.stringify(hourly));
    } catch {
        // ignore
    }
};
