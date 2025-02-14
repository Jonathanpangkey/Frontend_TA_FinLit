import React, {useEffect, useState, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getMaterialById, getMaterialsBySubModuleId} from "../api/Material";
import {getQuizzesBySubModuleId} from "../api/Quiz";
import {fetchSubModuleById} from "../api/Submodules"; // Adjust path if needed
import Navbar from "../components/Navbar";
import MaterialContent from "../components/MaterialContent";
import QuizContent from "../components/QuizContent";
import HandsonPractice from "../components/HandsonPractice";

function ContentDisplayPage() {
  const {subModuleId, materialId, quizId} = useParams();
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [subModuleResources, setSubModuleResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingQuiz, setViewingQuiz] = useState(false);
  const [viewingHandson, setViewingHandson] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedMaterials, fetchedQuizzes, fetchedSubModule] = await Promise.all([
          getMaterialsBySubModuleId(subModuleId),
          getQuizzesBySubModuleId(subModuleId),
          fetchSubModuleById(subModuleId),
        ]);

        const sortedMaterials = fetchedMaterials.sort((a, b) => a.orderNumber - b.orderNumber);
        setMaterials(sortedMaterials);
        setQuizzes(fetchedQuizzes);
        setSubModuleResources(fetchedSubModule.resources || []);

        if (materialId) {
          const fetchedMaterial = await getMaterialById(materialId);
          setCurrentMaterial(fetchedMaterial);
          setViewingQuiz(false);
          setViewingHandson(false);
        } else if (quizId) {
          setViewingQuiz(true);
        } else {
          if (subModuleId === "5") {
            setViewingHandson(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subModuleId, materialId, quizId]);

  const currentIndex = useMemo(() => materials.findIndex((material) => material.id === parseInt(materialId)), [materials, materialId]);

  const handleNavigateToMaterial = (targetIndex) => {
    navigate(`/submodule/${subModuleId}/material/${materials[targetIndex].id}`);
    setViewingQuiz(false);
    setViewingHandson(false);
  };

  const handleViewQuiz = () => {
    if (quizzes.length > 0) {
      navigate(`/submodule/${subModuleId}/quiz/${quizzes[0].id}`);
      setViewingQuiz(true);
    }
  };

  const handleViewHandson = () => {
    setViewingHandson(true);
    navigate(`/submodule/${subModuleId}/handson`);
  };

  return (
    <>
      <Navbar />
      <div className='material-display'>
        <button onClick={() => navigate("/")}>&#8592; Kembali</button>

        {loading ? (
          <p>Loading...</p>
        ) : viewingQuiz ? (
          <QuizContent quizzes={quizzes} quizId={quizId} subModuleId={subModuleId} />
        ) : viewingHandson ? (
          <HandsonPractice /> // tampilkan hands-on practice di sini
        ) : currentMaterial ? (
          <MaterialContent
            material={currentMaterial}
            currentIndex={currentIndex}
            materials={materials}
            onNavigateToMaterial={handleNavigateToMaterial}
            onViewQuiz={handleViewQuiz}
            onViewHandson={handleViewHandson}
            quizzes={quizzes}
            subModuleResources={subModuleResources}
            subModuleId={subModuleId}
          />
        ) : (
          <p>Material tidak ditemukan.</p>
        )}
      </div>
    </>
  );
}

export default ContentDisplayPage;
