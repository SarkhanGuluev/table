import { useCallback, useState } from "react";

export const useIntersectionObserver = () => {
  const [observer, setOserver] = useState<IntersectionObserver>();
  const [isIntersecting, setIntersecting] = useState(false);

  const measureRef = useCallback((node: Element) => {
    if (node) {
      const observer: IntersectionObserver = new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting);
        }
      );

      observer.observe(node);

      setOserver(observer);
    }
  }, []);

  return { measureRef, isIntersecting, observer };
};
