import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useIntersectionObserver from "../useIntersectionObserver"; // Import the custom hook

const SubModule = ({subModule, previousSubModuleCompleted, isFirstSubmodule}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [SubModuleBoxRef, isVisible] = useIntersectionObserver({threshold: 0.1});
  const navigate = useNavigate();

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleNavigation = () => {
    if (subModule.materials.length > 0) {
      const targetMaterial =
        subModule.materials.find((material) => material.orderNumber === subModule.completedMaterialsCount) ||
        subModule.materials.reduce((prev, curr) => (prev.orderNumber < curr.orderNumber ? prev : curr));

      const isMaterialCompleted = targetMaterial.orderNumber === subModule.completedMaterialsCount;

      if (isMaterialCompleted) {
        Swal.fire({
          title: "Continue from where you left off?",
          text: "Would you like to continue from the last completed material or start from the beginning?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Continue from Last Material",
          cancelButtonText: "Start from Beginning",
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
        title: "No content",
        text: `No materials available in this submodule.`,
      });
    }
  };

  const totalMaterials = subModule.materials.length;
  const completedMaterialsCount = subModule.completedMaterialsCount || 0;
  const quizCompleted = subModule.quizCompleted;

  const isCompleted = completedMaterialsCount === totalMaterials && quizCompleted;
  const isLocked = !isFirstSubmodule && !previousSubModuleCompleted;

  return (
    <div
      ref={SubModuleBoxRef}
      className={`submodule-box ${isLocked ? "locked" : ""} ${isCompleted ? "completed" : ""} ${isVisible ? "visible" : ""}`}>
      <div className='submodule-header' onClick={toggleOpen}>
        <div className='submodule-title' onClick={handleNavigation}>
          <h3>{subModule.name}</h3>
          <p>
            {completedMaterialsCount}/{totalMaterials} Completed {quizCompleted ? "(Quiz Completed)" : "(Quiz Incomplete)"}
          </p>
        </div>
        <div className='submodule-toggle'>
          <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </div>
      </div>
      {isOpen && (
        <div className='submodule-content'>
          <p>{subModule.description}</p>
        </div>
      )}
    </div>
  );
};

export default SubModule;
