import React from "react";
import ReactMarkdown from "react-markdown";
import AnimatedMarkdownElement from "./AnimatedMarkdownElement";

const MaterialContent = ({
  material,
  currentIndex,
  materials,
  onNavigateToMaterial,
  onViewQuiz,
  onViewHandson,
  quizzes,
  subModuleResources,
  subModuleId,
}) => {
  const handleViewQuiz = () => {
    if (material?.orderNumber === materials[materials.length - 1]?.orderNumber && quizzes.length > 0) {
      onViewQuiz();
    }
  };

  const handleViewHandson = () => {
    if (material?.orderNumber === materials[materials.length - 1]?.orderNumber) {
      onViewHandson();
    }
  };

  const navigateToMaterial = (offset) => {
    const targetIndex = currentIndex + offset;
    if (targetIndex >= 0 && targetIndex < materials.length) {
      onNavigateToMaterial(targetIndex);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const renderers = {
    p: ({children}) => <AnimatedMarkdownElement tag='p'>{children}</AnimatedMarkdownElement>,
    img: ({alt, src}) => (
      <AnimatedMarkdownElement tag='div'>
        <img alt={alt} src={src} />
      </AnimatedMarkdownElement>
    ),
    li: ({children}) => <AnimatedMarkdownElement tag='li'>{children}</AnimatedMarkdownElement>,
    h1: ({children}) => <AnimatedMarkdownElement tag='h1'>{children}</AnimatedMarkdownElement>,
    h2: ({children}) => <AnimatedMarkdownElement tag='h2'>{children}</AnimatedMarkdownElement>,
    h3: ({children}) => <AnimatedMarkdownElement tag='h3'>{children}</AnimatedMarkdownElement>,
    h4: ({children}) => <AnimatedMarkdownElement tag='h4'>{children}</AnimatedMarkdownElement>,
    pre: ({children}) => <AnimatedMarkdownElement tag='pre'>{children}</AnimatedMarkdownElement>,
  };

  return (
    <div>
      <h2 className='material-title'>Materi</h2>
      <ReactMarkdown components={renderers}>{material.content}</ReactMarkdown>

      {currentIndex === materials.length - 1 && subModuleResources.length > 0 && (
        <div className='additional-resources'>
          <h3>Tambahan Materi</h3>
          <ul>
            {subModuleResources.map((resource, index) => (
              <li key={index}>
                <a href={resource.url} target='_blank' rel='noopener noreferrer'>
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentIndex > 0 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={() => navigateToMaterial(-1)}>Sebelumnya</button>
        </AnimatedMarkdownElement>
      )}

      {currentIndex < materials.length - 1 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={() => navigateToMaterial(1)}>Selanjutnya</button>
        </AnimatedMarkdownElement>
      )}

      {currentIndex === materials.length - 1 && quizzes.length > 0 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={handleViewQuiz}>Ambil Quiz</button>
        </AnimatedMarkdownElement>
      )}

      {currentIndex === materials.length - 1 && subModuleId == 5 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={handleViewHandson}>Latihan praktek</button>
        </AnimatedMarkdownElement>
      )}

      {/* Scroll to Top Button */}
      <button onClick={scrollToTop} className='scroll-to-top'>
        ↑
      </button>
    </div>
  );
};

export default MaterialContent;
