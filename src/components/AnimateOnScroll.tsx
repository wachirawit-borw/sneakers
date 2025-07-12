"use client";

import { useInView } from 'react-intersection-observer';
// ✅ 1. Import useState และ useEffect เพิ่มเข้ามา
import { useState, useEffect, type ReactNode } from 'react';

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimateOnScroll({ children, className = '' }: AnimateOnScrollProps) {

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`scroll-animate ${inView ? 'scroll-animate-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
}