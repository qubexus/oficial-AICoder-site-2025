import { useState, useEffect, useRef } from 'react';

// Custom hook to detect when an element is on screen
export const useOnScreen = (options: IntersectionObserverInit & { triggerOnce?: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { triggerOnce = true, ...observerOptions } = options;
    const optionsJSON = JSON.stringify(observerOptions);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (triggerOnce && ref.current) {
                    observer.unobserve(ref.current);
                }
            } else if (!triggerOnce) {
                 setIsVisible(false);
            }
        }, observerOptions);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, triggerOnce, optionsJSON]);

    return [ref, isVisible] as const;
};
