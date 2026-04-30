import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

// Smooth scroll behavior
export const useScrollAnimation = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls };
};

// Common animation variants
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  },
  slideInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
};

// Enable smooth scrolling globally
export const enableSmoothScroll = () => {
  if (typeof window !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
};

// Scroll to element with offset
export const scrollToElement = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
};

// Parallax scroll effect hook
export const useParallax = (offset = 0.5) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });

  useEffect(() => {
    const handleScroll = () => {
      if (inView && ref.current) {
        const scrollY = window.scrollY;
        const elementY = (ref.current as any).getBoundingClientRect().top + scrollY;
        const parallaxOffset = (scrollY - elementY) * offset;
        controls.start({
          y: parallaxOffset,
          transition: { type: 'spring', stiffness: 100, damping: 30 }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, controls, ref, offset]);

  return { ref, controls };
};

export default {
  useScrollAnimation,
  animationVariants,
  enableSmoothScroll,
  scrollToElement,
  useParallax
};
