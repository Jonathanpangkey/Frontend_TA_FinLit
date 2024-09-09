import React, {useEffect, useState, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getMaterialById, getMaterialsBySubModuleId} from "../api/Material";
import {getQuizzesBySubModuleId} from "../api/Quiz";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import Quiz from "../components/Quiz";

function MaterialDisplay() {
  const {subModuleId, materialId, quizId} = useParams();
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [viewingQuiz, setViewingQuiz] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedMaterials, fetchedQuizzes] = await Promise.all([getMaterialsBySubModuleId(subModuleId), getQuizzesBySubModuleId(subModuleId)]);

        const sortedMaterials = fetchedMaterials.sort((a, b) => a.orderNumber - b.orderNumber);
        setMaterials(sortedMaterials);
        setQuizzes(fetchedQuizzes);

        if (materialId) {
          const fetchedMaterial = await getMaterialById(materialId);
          setCurrentMaterial(fetchedMaterial);
          setViewingQuiz(false);
        } else if (quizId) {
          setViewingQuiz(true);
        }
      } catch (error) {}
    };

    fetchData();
  }, [subModuleId, materialId, quizId]);

  // calculate the index of the current material in the materials array only if materials and material id changes
  const currentIndex = useMemo(() => materials.findIndex((material) => material.id === parseInt(materialId)), [materials, materialId]);

  const navigateToMaterial = (offset) => {
    const targetIndex = currentIndex + offset;
    if (targetIndex >= 0 && targetIndex < materials.length) {
      navigate(`/submodule/${subModuleId}/material/${materials[targetIndex].id}`);
      setViewingQuiz(false);
    }
  };

  const handleViewQuiz = () => {
    if (currentMaterial?.orderNumber === materials[materials.length - 1]?.orderNumber) {
      navigate(`/submodule/${subModuleId}/quiz/${quizzes[0]?.id}`);
      setViewingQuiz(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className='material-display'>
        {viewingQuiz ? (
          <Quiz quizzes={quizzes} quizId={quizId} subModuleId={subModuleId} />
        ) : currentMaterial ? (
          <div>
            <h3>{currentMaterial.name}</h3>
            <ReactMarkdown>{currentMaterial.content}</ReactMarkdown>
            {currentIndex > 0 && <button onClick={() => navigateToMaterial(-1)}>Previous</button>}
            {currentIndex < materials.length - 1 && <button onClick={() => navigateToMaterial(1)}>Next</button>}
            {currentIndex === materials.length - 1 && quizzes.length > 0 && <button onClick={handleViewQuiz}>View Quiz</button>}
          </div>
        ) : (
          <p>Loading material...</p>
        )}
      </div>
    </>
  );
}

export default MaterialDisplay;
