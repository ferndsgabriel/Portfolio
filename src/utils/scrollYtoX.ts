import { useEffect, useRef, type RefObject } from 'react';

export const useHorizontalScroll = (): RefObject<HTMLDivElement | null> => {
    const elRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            if (window.innerWidth >= 1024) {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    el.scrollLeft += e.deltaY * 2;
                }
            }
        };

        el.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            el.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return elRef;
};