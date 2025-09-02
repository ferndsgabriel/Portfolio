import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';

const bgColors = ['#000000', 'rgb(4,6,90)', 'rgb(1,3,134)', 'rgb(5,8,207)'];

interface BgContextType {
  bg: string;
  scrollPercent: number; // porcentagem atual do scroll
  setCustomScrollContainer: (el: HTMLDivElement | null) => void;
}

const BgContext = createContext<BgContextType>({
  bg: bgColors[0],
  scrollPercent: 0,
  setCustomScrollContainer: () => {}
});

export const useBg = () => useContext(BgContext);

interface BgProviderProps {
  children: ReactNode;
}

export const BgProvider = ({ children }: BgProviderProps) => {
  const [bg, setBg] = useState(bgColors[0]);
  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const setCustomScrollContainer = (el: HTMLDivElement | null) => {
    scrollContainerRef.current = el;
  };

  useEffect(() => {
    const updateBg = () => {
      const isWide = window.innerWidth >= 1024;
      const target = isWide ? scrollContainerRef.current : window;

      if (!target) return;

      const scrollPos = isWide
        ? (target as HTMLDivElement).scrollLeft
        : window.scrollY;

      const dimension = isWide
        ? (target as HTMLDivElement).scrollWidth
        : document.documentElement.scrollHeight;

      const viewport = isWide ? window.innerWidth : window.innerHeight;

      // cálculo da porcentagem (0–100)
      const percent = (scrollPos / (dimension - viewport)) * 100;
      setScrollPercent(Math.min(Math.max(percent, 0), 100)); // clamp entre 0 e 100

      // lógica das cores
      const sectionSize = dimension / bgColors.length;
      const index = Math.floor(scrollPos / sectionSize);
      const clampedIndex = Math.min(index, bgColors.length - 1);

      setBg(bgColors[clampedIndex]);
    };

    // Configura os listeners
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener('scroll', updateBg, { passive: true });
    window.addEventListener('scroll', updateBg, { passive: true });
    window.addEventListener('resize', updateBg);

    // Atualiza inicialmente
    updateBg();

    return () => {
      scrollContainer?.removeEventListener('scroll', updateBg);
      window.removeEventListener('scroll', updateBg);
      window.removeEventListener('resize', updateBg);
    };
  }, []);

  return (
    <BgContext.Provider value={{ bg, scrollPercent, setCustomScrollContainer }}>
      {children}
    </BgContext.Provider>
  );
};
