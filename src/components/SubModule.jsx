import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const SubModule = ({subModule, previousSubModuleCompleted, isFirstSubmodule}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const totalMaterials = subModule.materials.length;
  const completedMaterialsCount = subModule.completedMaterialsCount || 0; // Ensure this reflects the correct count
  const quizCompleted = subModule.quizCompleted;

  // Adjust logic to unlock the first submodule
  const isLocked = !isFirstSubmodule && !previousSubModuleCompleted;

  // Logging for debugging
  // console.log(`SubModule: ${subModule.name}`);
  // console.log(`isFirstSubmodule: ${isFirstSubmodule}`);
  // console.log(`previousSubModuleCompleted: ${previousSubModuleCompleted}`);
  // console.log(`completedMaterials: ${completedMaterialsCount}/${totalMaterials}`);
  // console.log(`quizCompleted: ${quizCompleted}`);
  // console.log(`isLocked: ${isLocked}`);

  const handleNavigation = () => {
    if (subModule.materials.length > 0) {
      // find the first material in the submodule based on orderNumber.
      const firstMaterial = subModule.materials.reduce((prev, curr) => (prev.orderNumber < curr.orderNumber ? prev : curr)); // Finds and returns the material with the smallest orderNumber in the materials array.
      navigate(`/submodule/${subModule.id}/material/${firstMaterial.id}`);
    } else {
      Swal.fire({
        icon: "info",
        title: "No content",
        text: `No materials available in this submodule.`,
      });
    }
  };

  return (
    <div className={`submodule-box ${isLocked ? "locked" : ""}`}>
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
