import React from "react";
import Material from "./Material";

const MaterialSection = ({sectionTitle, materials}) => {
  return (
    <div className='material-section'>
      <h3 className='section-title'>{sectionTitle}</h3>
      {materials.map((material, index) => (
        <Material key={index} title={material.title} completed={material.completed} total={material.total} />
      ))}
    </div>
  );
};

export default MaterialSection;
