import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {fetchModules} from "../api/Module";
import SubmoduleSection from "../components/SubmoduleSection";
import ProgressSection from "../components/ProgressCircle";
import ExamBox from "../components/ExamBox"; // Import ExamBox

function HomePage() {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState(0);
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch modules
        const modulesData = await fetchModules();
        setModules(modulesData);

        // Calculate initial progress
        calculateProgress(modulesData, false);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const calculateProgress = (modules, examCompleted) => {
    let totalItems = 0;
    let completedItems = 0;

    modules.forEach((module) => {
      module.subModules.forEach((subModule) => {
        totalItems += subModule.materials.length + subModule.quizzes.length;
        completedItems += subModule.completedMaterialsCount || 0;
        completedItems += subModule.quizCompleted ? subModule.quizzes.length : 0;
      });
    });

    // Include the exam in the progress calculation
    totalItems += 1; // Assuming one exam
    completedItems += examCompleted ? 1 : 0;

    const progressPercentage = (completedItems / totalItems) * 100;
    setProgress(progressPercentage);
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
        <h3 className='section-title'>Ujian Akhir</h3>
        <ExamBox modules={modules} calculateProgress={calculateProgress} /> {/* Use ExamBox */}
      </div>
    </>
  );
}

export default HomePage;
