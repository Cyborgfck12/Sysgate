import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Only scroll to top on desktop (width > 768px)
        if (window.innerWidth > 768) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
