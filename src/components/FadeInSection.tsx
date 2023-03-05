import { useState, useRef, useEffect } from "react";



// adapted from https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
function FadeInSection(props: { children: React.ReactNode}) {
  const [isVisible, setVisible] = useState<boolean>(true);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default FadeInSection;
