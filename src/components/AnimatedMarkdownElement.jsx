import React, {useEffect, useRef, useState} from "react";

const AnimatedMarkdownElement = ({children, tag = "div"}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Adjust as needed
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const Tag = tag;

  return (
    <Tag ref={elementRef} className={`markdown-element ${isVisible ? "visible" : ""}`}>
      {children}
    </Tag>
  );
};

export default AnimatedMarkdownElement;
