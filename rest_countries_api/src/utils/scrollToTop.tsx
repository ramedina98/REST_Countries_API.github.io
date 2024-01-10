import { useEffect } from 'react';

const ScrollToTopOnMount = (): void => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export default ScrollToTopOnMount;