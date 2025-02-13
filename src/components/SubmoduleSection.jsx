import React from "react";
import SubModule from "./SubModuleBox";

function SubmoduleSection({module, isFirstModule, previousModuleCompleted}) {
  return (
    <div className={`submodule-section`}>
      <h3 className='section-title'>{module.name}</h3>
      <ul>
        {module.subModules
          .sort((a, b) => a.orderNumber - b.orderNumber) // Sort submodules by orderNumber
          .map((subModule, index) => {
            const isFirstSubmoduleInModule = index === 0;
            const isFirstSubmoduleOverall = isFirstModule && isFirstSubmoduleInModule;

            // Ensure previousSubModuleCompleted is calculated properly
            const previousSubModuleCompleted =
              index === 0
                ? previousModuleCompleted // Check if the previous module is completed
                : module.subModules[index - 1]?.completedMaterialsCount >= (module.subModules[index - 1]?.materials.length || 0) &&
                  module.subModules[index - 1]?.quizCompleted; // If the number of completed materials is equal to or greater than the total materials, it implies that all materials in the previous submodule are completed.

            return (
              <SubModule
                key={subModule.id}
                subModule={subModule}
                previousSubModuleCompleted={previousSubModuleCompleted}
                isFirstSubmodule={isFirstSubmoduleOverall}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default SubmoduleSection;
