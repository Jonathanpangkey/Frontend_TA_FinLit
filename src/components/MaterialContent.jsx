import React from "react";
import ReactMarkdown from "react-markdown";
import AnimatedMarkdownElement from "./AnimatedMarkdownElement";

const MaterialContent = ({material, currentIndex, materials, onNavigateToMaterial, onViewQuiz, onViewHandson, quizzes, subModuleId}) => {
  // Fungsi untuk melihat quiz jika sudah sampai material terakhir
  const handleViewQuiz = () => {
    if (material?.orderNumber === materials[materials.length - 1]?.orderNumber && quizzes.length > 0) {
      onViewQuiz();
    }
  };

  const handleViewHandson = () => {
    if (material?.orderNumber === materials[materials.length - 1]?.orderNumber && quizzes.length === 0) {
      onViewHandson(); // Trigger the view handson callback
    }
  };

  // Fungsi navigasi antar material
  const navigateToMaterial = (offset) => {
    const targetIndex = currentIndex + offset;
    if (targetIndex >= 0 && targetIndex < materials.length) {
      onNavigateToMaterial(targetIndex);
    }
  };

  // Fungsi untuk scroll ke atas
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
          <button onClick={handleViewQuiz}>Lihat Quiz</button>
        </AnimatedMarkdownElement>
      )}

      {/* Button Lanjut ke Hands-on jika tidak ada quiz */}
      {currentIndex === materials.length - 1 && subModuleId == 5 && (
        <AnimatedMarkdownElement tag='button'>
          <button onClick={handleViewHandson}>Lanjut ke Hands-on</button>
        </AnimatedMarkdownElement>
      )}

      {/* Tombol Scroll ke Atas */}
      <button onClick={scrollToTop} className='scroll-to-top'>
        ↑
      </button>
    </div>
  );
};

export default MaterialContent;
