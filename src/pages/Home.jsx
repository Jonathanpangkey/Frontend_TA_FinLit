import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {fetchModules} from "../api/Module";
import SubmoduleSection from "../components/SubmoduleSection";

function Home() {
  const [modules, setModules] = useState([]);
  const firstName = localStorage.getItem("firstName");

  useEffect(() => {
    const loadModules = async () => {
      try {
        const modulesData = await fetchModules();
        setModules(modulesData);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    loadModules();
  }, []);

  return (
    <>
      <Navbar />
      <div className='container home-container'>
        <div className='top-home'>
          <h3>
            Halo, <span>{firstName}</span>
          </h3>
          <p>Tingkatkan pengetahuan anda dengan materi terbaru, yuk mulai belajar ilmu finansial !!</p>
          <div className='progress-box'>
            <div className='text'>
              <h2>PROGRESS KAMU SAAT INI</h2>
              <p>Pantau kemajuan kamu dan raih lebih banyak pencapaian !</p>
            </div>
            <div className='circle-container'>
              <div className='circle'></div>
            </div>
          </div>
        </div>

        {modules.map((module, index) => {
          // jika index 0 akan otomatis true, jika tidak akan dilakukan pengecekan
          const previousModuleCompleted =
            index === 0
              ? true
              : modules[index - 1].subModules.every((subModule) => {
                  return subModule.completedMaterialsCount >= subModule.materials.length && subModule.quizCompleted; // semua submodule harus complete (material & quiz)
                });

          return <SubmoduleSection key={module.id} module={module} isFirstModule={index === 0} previousModuleCompleted={previousModuleCompleted} />;
        })}
      </div>
    </>
  );
}

export default Home;
