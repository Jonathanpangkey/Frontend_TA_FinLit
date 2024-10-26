import React, {useEffect, useState, useMemo} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getMaterialById, getMaterialsBySubModuleId} from "../api/Material";
import {getQuizzesBySubModuleId} from "../api/Quiz";
import Navbar from "../components/Navbar";
import MaterialContent from "../components/MaterialContent";
import QuizContent from "../components/QuizContent";
import HandsonPractice from "../components/HandsonPractice"; // import the new component

function ContentDisplayPage() {
  const {subModuleId, materialId, quizId} = useParams();
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [viewingQuiz, setViewingQuiz] = useState(false);
  const [viewingHandson, setViewingHandson] = useState(false); // new state for hands-on
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedMaterials, fetchedQuizzes] = await Promise.all([getMaterialsBySubModuleId(subModuleId), getQuizzesBySubModuleId(subModuleId)]);

        const sortedMaterials = fetchedMaterials.sort((a, b) => a.orderNumber - b.orderNumber);
        setMaterials(sortedMaterials);
        setQuizzes(fetchedQuizzes);

        // Menentukan material atau quiz yang dilihat berdasarkan URL params
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
      }
    };

    fetchData();
  }, [subModuleId, materialId, quizId]);

  // Menghitung current index material berdasarkan materialId
  const currentIndex = useMemo(() => materials.findIndex((material) => material.id === parseInt(materialId)), [materials, materialId]);

  // Fungsi navigasi untuk material berikutnya/sebelumnya
  const handleNavigateToMaterial = (targetIndex) => {
    navigate(`/submodule/${subModuleId}/material/${materials[targetIndex].id}`);
    setViewingQuiz(false);
    setViewingHandson(false); // pastikan hands-on disembunyikan saat berpindah material
  };

  // Fungsi untuk melihat quiz
  const handleViewQuiz = () => {
    if (quizzes.length > 0) {
      navigate(`/submodule/${subModuleId}/quiz/${quizzes[0].id}`);
      setViewingQuiz(true);
    }
  };

  const handleViewHandson = () => {
    setViewingHandson(true); // Set state untuk menampilkan Hands-on
    navigate(`/submodule/${subModuleId}/handson`); // Navigasi secara eksplisit
  };

  return (
    <>
      <Navbar />
      <div className='material-display'>
        <button onClick={() => navigate("/")}>&#8592; Kembali</button>
        {viewingQuiz ? (
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
            subModuleId={subModuleId}
          />
        ) : (
          <p>Loading material...</p>
        )}
      </div>
    </>
  );
}

export default ContentDisplayPage;
