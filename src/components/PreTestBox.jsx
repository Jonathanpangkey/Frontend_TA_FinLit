import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useIntersectionObserver from "../useIntersectionObserver";
import {getPreTestProgress} from "../api/PreTest";

const PreTestBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [preTestBoxRef, isVisible] = useIntersectionObserver({threshold: 0.1});
  const [preTestStatus, setPreTestStatus] = useState(null);
  const [lastPreTestScore, setLastPreTestScore] = useState(null);

  useEffect(() => {
    const fetchPreTestStatus = async () => {
      try {
        const preTestProgress = await getPreTestProgress();
        setPreTestStatus(preTestProgress.preTestCompleted ? "completed" : "not completed");
        setLastPreTestScore(preTestProgress.lastScore || null);
      } catch (error) {
        console.error("Error fetching pre-test status:", error);
      }
    };

    fetchPreTestStatus();
  }, []);

  const navigateToPreTestPage = () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin mengambil pre-test?",
      text: "Pastikan Anda siap sebelum memulai pre-test.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, saya siap",
      cancelButtonText: "Tidak, belum siap",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/pre-test`);
      }
    });
  };

  return (
    <div ref={preTestBoxRef} className={`exam-box ${isVisible ? "visible" : ""} ${preTestStatus === "completed" ? "completed" : ""}`}>
      <div className='exam-header' onClick={() => setIsOpen(!isOpen)}>
        <div className='exam-title'>
          <h3 onClick={() => navigateToPreTestPage()}>
            <i className='fa-solid fa-clipboard title-icon'></i> Pre Test
          </h3>
          {preTestStatus === "completed" && <p>Pre-Test Selesai! Skor Anda: {lastPreTestScore} dari 100</p>}
          {preTestStatus === "not completed" && (
            <p>
              {lastPreTestScore !== null
                ? `Skor Anda: ${lastPreTestScore} dari 100. ${lastPreTestScore >= 80 ? "Lulus." : "Belum lulus."}`
                : "Pre-Test belum diambil."}
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

export default PreTestBox;
