import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useIntersectionObserver from "../useIntersectionObserver"; // Import the custom hook
import {fetchLearningObjectivesWithQuizCompletion} from "../api/LearningObj";

const SubModuleBox = ({subModule, previousSubModuleCompleted, isFirstSubmodule}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [SubModuleBoxRef, isVisible] = useIntersectionObserver({threshold: 0.1});
  const [learningObjectives, setLearningObjectives] = useState([]);
  const navigate = useNavigate();

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const objectives = await fetchLearningObjectivesWithQuizCompletion(subModule.id);
        setLearningObjectives(objectives);
      } catch (error) {
        console.error("Error fetching learning objectives:", error);
      }
    };

    fetchObjectives();
  }, [subModule.id]);

  const handleNavigation = () => {
    if (subModule.materials.length > 0) {
      const targetMaterial =
        subModule.materials.find((material) => material.orderNumber === subModule.completedMaterialsCount) ||
        subModule.materials.reduce((prev, curr) => (prev.orderNumber < curr.orderNumber ? prev : curr));

      const isMaterialCompleted = targetMaterial.orderNumber === subModule.completedMaterialsCount;

      if (isMaterialCompleted) {
        Swal.fire({
          title: "Lanjutkan dari tempat Anda berhenti?",
          text: "Apakah Anda ingin melanjutkan dari materi terakhir yang diselesaikan atau mulai dari awal?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Lanjutkan dari Materi Terakhir",
          cancelButtonText: "Mulai dari Awal",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/submodule/${subModule.id}/material/${targetMaterial.id}`);
          } else {
            const firstMaterial = subModule.materials.reduce((prev, curr) => (prev.orderNumber < curr.orderNumber ? prev : curr));
            navigate(`/submodule/${subModule.id}/material/${firstMaterial.id}`);
          }
        });
      } else {
        navigate(`/submodule/${subModule.id}/material/${targetMaterial.id}`);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Tidak ada konten",
        text: `Tidak ada materi yang tersedia dalam submodul ini.`,
      });
    }
  };

  const totalMaterials = subModule.materials.length;
  const completedMaterialsCount = subModule.completedMaterialsCount || 0;
  const quizCompleted = subModule.quizCompleted;
  const isCompleted = completedMaterialsCount === totalMaterials && subModule.quizCompleted;
  const isLocked = !isFirstSubmodule && !previousSubModuleCompleted;

  return (
    <div
      ref={SubModuleBoxRef}
      className={`submodule-box ${isLocked ? "locked" : ""} ${isCompleted ? "completed" : ""} ${isVisible ? "visible" : ""}`}>
      <div className='submodule-header' onClick={toggleOpen}>
        <div className='submodule-title' onClick={handleNavigation}>
          <h3>
            <i className='fa-solid fa-book title-icon'></i> {subModule.name}
          </h3>
          <p>
            Materi {completedMaterialsCount}/{totalMaterials} Selesai {quizCompleted ? "(Kuis Selesai)" : "(Kuis Belum Selesai)"}
          </p>
        </div>
        <div className='submodule-toggle'>
          <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </div>
      </div>
      {isOpen && (
        <div className='submodule-content'>
          <h4>Learning Objectives:</h4>
          <ul>
            {learningObjectives.map((objective) => (
              <li key={objective.id} style={{listStyleType: "disc", marginLeft: "20px"}}>
                {objective.objectiveDescription}{" "}
                <span>
                  <i
                    style={{color: objective.quizCompleted ? "green" : "red"}}
                    className={`fa ${objective.quizCompleted ? "fa-check-circle" : "fa-times-circle"}`}></i>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubModuleBox;
