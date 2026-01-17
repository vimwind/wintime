import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export default function ParallaxSection({
  children,
  offset = 50,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const windowHeight = window.innerHeight;

        // Only calculate parallax if element is in view
        if (elementBottom > 0 && elementTop < windowHeight) {
          const distanceFromCenter = (windowHeight / 2 - elementTop) / (windowHeight / 2);
          setYOffset(distanceFromCenter * offset);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y: yOffset }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
