import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {fetchModules} from "../api/Module";
import SubmoduleSection from "../components/SubmoduleSection";
import ProgressSection from "../components/ProgressCircle";
import {useNavigate} from "react-router-dom";
import useIntersectionObserver from "../useIntersectionObserver";

function Home() {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");
  const [examBoxRef, isVisible] = useIntersectionObserver({threshold: 0.1});

  useEffect(() => {
    const loadModules = async () => {
      try {
        const modulesData = await fetchModules();
        setModules(modulesData);
        calculateProgress(modulesData);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    loadModules();
  }, []);

  const calculateProgress = (modules) => {
    let totalItems = 0;
    let completedItems = 0;

    modules.forEach((module) => {
      module.subModules.forEach((subModule) => {
        totalItems += subModule.materials.length;
        completedItems += subModule.completedMaterialsCount || 0;

        totalItems += subModule.quizzes.length;
        if (subModule.quizCompleted) {
          completedItems += subModule.quizzes.length;
        }
      });
    });

    const progressPercentage = (completedItems / totalItems) * 100;
    setProgress(progressPercentage);
  };

  const navigateToExamPage = () => {
    navigate(`/exam`);
  };

  return (
    <>
      <Navbar />
      <div className='container home-container'>
        <ProgressSection percentage={progress} firstName={firstName} />

        {modules.map((module, index) => {
          const previousModuleCompleted =
            index === 0
              ? true
              : modules[index - 1].subModules.every((subModule) => {
                  return subModule.completedMaterialsCount >= subModule.materials.length && subModule.quizCompleted;
                });

          return <SubmoduleSection key={module.id} module={module} isFirstModule={index === 0} previousModuleCompleted={previousModuleCompleted} />;
        })}
        <div ref={examBoxRef} className={`exam-box ${isVisible ? "visible" : ""}`}>
          <div className='exam-header' onClick={() => setIsOpen(!isOpen)}>
            <h3 onClick={() => navigateToExamPage()}>Final Exam</h3>
            <div className='submodule-toggle'>
              <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
            </div>
          </div>
          {isOpen && (
            <div className='exam-content'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab natus deleniti magnam cumque tempora. Sed distinctio aperiam numquam quia
                molestiae.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
