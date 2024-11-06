import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useIntersectionObserver from "../useIntersectionObserver";
import {getExamProgress} from "../api/Exam";

const ExamBox = ({modules}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [examBoxRef, isVisible] = useIntersectionObserver({threshold: 0.1});
  const [examStatus, setExamStatus] = useState(null);
  const [lastExamScore, setLastExamScore] = useState(null);
  const [isExamLocked, setIsExamLocked] = useState(true);

  useEffect(() => {
    const fetchExamStatus = async () => {
      try {
        const examProgress = await getExamProgress();
        setExamStatus(examProgress.examCompleted ? "completed" : "not completed");
        setLastExamScore(examProgress.lastScore || null);

        // Check if all modules and submodules are completed to unlock the exam
        const allModulesCompleted = modules.every((module) =>
          module.subModules.every((subModule) => subModule.completedMaterialsCount >= subModule.materials.length && subModule.quizCompleted)
        );
        setIsExamLocked(!allModulesCompleted);
      } catch (error) {
        console.error("Error fetching exam status:", error);
      }
    };

    fetchExamStatus();
  }, [modules]);

  const navigateToExamPage = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin mengambil ujian?",
      text: "Pastikan Anda siap sebelum memulai ujian.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, saya siap",
      cancelButtonText: "Tidak, belum siap",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/exam`);
      }
    });
  };

  return (
    <div
      ref={examBoxRef}
      className={`exam-box ${isVisible ? "visible" : ""} ${examStatus === "completed" ? "completed" : ""} ${isExamLocked ? "locked" : ""}`}>
      <div className='exam-header' onClick={() => setIsOpen(!isOpen)}>
        <div className='exam-title'>
          <h3 onClick={() => navigateToExamPage()}>
            <i className='fa-solid fa-clipboard title-icon'></i> Ujian Akhir
          </h3>
          {examStatus === "completed" && <p>Ujian Selesai! Skor Anda: {lastExamScore} dari 100</p>}
          {examStatus === "not completed" && (
            <p>
              {lastExamScore !== null
                ? `Skor Anda: ${lastExamScore} dari 100. ${lastExamScore >= 80 ? "Lulus." : "Belum lulus."}`
                : "Ujian belum diambil."}
            </p>
          )}
        </div>
        <div className='exam-toggle'>
          <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </div>
      </div>
      {isOpen && (
        <div className='exam-content'>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum porro aperiam sint? Nulla, ipsa voluptatibus quis ab animi deserunt
            perspiciatis.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExamBox;
