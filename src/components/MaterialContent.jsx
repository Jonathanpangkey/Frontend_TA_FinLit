import ReactMarkdown from "react-markdown";
import AnimatedMarkdownElement from "./AnimatedMarkdownElement";

const MaterialContent = ({material, currentIndex, materials, onNavigateToMaterial, onViewQuiz, quizzes}) => {
  const handleViewQuiz = () => {
    if (material?.orderNumber === materials[materials.length - 1]?.orderNumber && quizzes.length > 0) {
      onViewQuiz();
    }
  };

  const navigateToMaterial = (offset) => {
    const targetIndex = currentIndex + offset;
    if (targetIndex >= 0 && targetIndex < materials.length) {
      onNavigateToMaterial(targetIndex);
    }
  };

  const renderers = {
    p: ({children}) => <AnimatedMarkdownElement tag='p'>{children}</AnimatedMarkdownElement>,
    img: ({alt, src}) => (
      <AnimatedMarkdownElement tag='img'>
        <img alt={alt} src={src} />
      </AnimatedMarkdownElement>
    ),
    li: ({children}) => <AnimatedMarkdownElement tag='li'>{children}</AnimatedMarkdownElement>,
    h1: ({children}) => <AnimatedMarkdownElement tag='h1'>{children}</AnimatedMarkdownElement>,
    h2: ({children}) => <AnimatedMarkdownElement tag='h2'>{children}</AnimatedMarkdownElement>,
    h3: ({children}) => <AnimatedMarkdownElement tag='h3'>{children}</AnimatedMarkdownElement>,
    h4: ({children}) => <AnimatedMarkdownElement tag='h4'>{children}</AnimatedMarkdownElement>,
    pre: ({children}) => <AnimatedMarkdownElement tag='pre'>{children}</AnimatedMarkdownElement>,
    // Add more renderers if needed
  };

  return (
    <div>
      <AnimatedMarkdownElement tag='h1'>{material.name}</AnimatedMarkdownElement>
      <ReactMarkdown components={renderers}>{material.content}</ReactMarkdown>

      {currentIndex > 0 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={() => navigateToMaterial(-1)}>Previous</button>
        </AnimatedMarkdownElement>
      )}

      {currentIndex < materials.length - 1 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={() => navigateToMaterial(1)}>Next</button>
        </AnimatedMarkdownElement>
      )}

      {currentIndex === materials.length - 1 && quizzes.length > 0 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={handleViewQuiz}>View Quiz</button>
        </AnimatedMarkdownElement>
      )}
    </div>
  );
};

export default MaterialContent;
