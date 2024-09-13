import React, {useEffect, useState, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getMaterialById, getMaterialsBySubModuleId} from "../api/Material";
import {getQuizzesBySubModuleId} from "../api/Quiz";
import Navbar from "../components/Navbar";
import MaterialContent from "../components/MaterialContent";
import Quiz from "../components/Quiz";

function ContentDisplay() {
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
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [subModuleId, materialId, quizId]);

  const currentIndex = useMemo(() => materials.findIndex((material) => material.id === parseInt(materialId)), [materials, materialId]);

  const handleNavigateToMaterial = (targetIndex) => {
    navigate(`/submodule/${subModuleId}/material/${materials[targetIndex].id}`);
    setViewingQuiz(false);
  };

  const handleViewQuiz = () => {
    navigate(`/submodule/${subModuleId}/quiz/${quizzes[0]?.id}`);
    setViewingQuiz(true);
  };

  return (
    <>
      <Navbar />
      <div className='material-display'>
        {viewingQuiz ? (
          <Quiz quizzes={quizzes} quizId={quizId} subModuleId={subModuleId} />
        ) : currentMaterial ? (
          <MaterialContent
            material={currentMaterial}
            currentIndex={currentIndex}
            materials={materials}
            onNavigateToMaterial={handleNavigateToMaterial}
            onViewQuiz={handleViewQuiz}
            quizzes={quizzes}
          />
        ) : (
          <p>Loading material...</p>
        )}
      </div>
    </>
  );
}

export default ContentDisplay;
