import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {fetchModules} from "../api/Module";
import {fetchUserProgressById} from "../api/UsersProgress";
import {fetchUserInfo} from "../api/User";
import SubmoduleSection from "../components/SubmoduleSection";
import ProgressSection from "../components/ProgressCircle";
import ExamBox from "../components/ExamBox";
import PreTestBox from "../components/PreTestBox";

function HomePage() {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState(0);
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch user info to get userId
        const userInfo = await fetchUserInfo();

        // Fetch modules
        const modulesData = await fetchModules();
        setModules(modulesData);

        if (userInfo.id) {
          // Fetch user progress using userId
          const userProgress = await fetchUserProgressById(userInfo.id);
          setProgress(userProgress.overallProgressPercentage);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div className='container home-container'>
        <ProgressSection percentage={progress} firstName={firstName} />
        <PreTestBox />
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
        <ExamBox modules={modules} />
      </div>
    </>
  );
}

export default HomePage;
