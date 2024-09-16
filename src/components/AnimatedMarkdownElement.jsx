import React from "react";
import useIntersectionObserver from "../useIntersectionObserver";

const AnimatedMarkdownElement = ({children, tag = "div"}) => {
  const [elementRef, isVisible] = useIntersectionObserver({threshold: 0.1});

  const Tag = tag;

  return (
    <Tag ref={elementRef} className={`markdown-element ${isVisible ? "visible" : ""}`}>
      {children}
    </Tag>
  );
};

export default AnimatedMarkdownElement;
