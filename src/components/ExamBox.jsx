import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useIntersectionObserver from "../useIntersectionObserver";
import {getExamProgress} from "../api/Exam";
import {fetchUserInfo} from "../api/User";
import jsPDF from "jspdf";

const ExamBox = ({modules}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [examBoxRef, isVisible] = useIntersectionObserver({threshold: 0.1});
  const [examStatus, setExamStatus] = useState(null);
  const [lastExamScore, setLastExamScore] = useState(null);
  const [isExamLocked, setIsExamLocked] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Fetch exam status and unlock criteria
    const fetchExamStatus = async () => {
      try {
        const examProgress = await getExamProgress();
        setExamStatus(examProgress.examCompleted ? "completed" : "not completed");
        setLastExamScore(examProgress.lastScore || null);

        const allModulesCompleted = modules.every((module) =>
          module.subModules.every((subModule) => subModule.completedMaterialsCount >= subModule.materials.length && subModule.quizCompleted)
        );
        setIsExamLocked(!allModulesCompleted);
      } catch (error) {
        console.error("Error fetching exam status:", error);
      }
    };

    // Fetch user information
    const fetchUser = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchExamStatus();
    fetchUser();
  }, [modules]);

  const navigateToExamPage = () => {
    Swal.fire({
      title: "Informasi Penting Sebelum Mengambil Ujian",
      html: `
        <ul style="text-align: left;">
          <li>Pastikan koneksi internet Anda stabil.</li>
          <li>Anda memiliki waktu 30 menit untuk menyelesaikan ujian.</li>
          <li>Jangan menutup atau memuat ulang halaman selama ujian berlangsung.</li>
          <li>Pastikan Anda berada di tempat yang tenang dan bebas dari gangguan.</li>
          <li>Setelah waktu habis, ujian akan otomatis diselesaikan.</li>
        </ul>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ya, saya siap",
      cancelButtonText: "Tidak, belum siap",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/exam`);
      }
    });
  };

  const downloadCertificate = () => {
    const doc = new jsPDF("landscape", "pt", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Draw a border around the page
    doc.setDrawColor(0); // Black color for border
    doc.setLineWidth(3);
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60);

    // Title
    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    doc.text("Certificate of Completion", pageWidth / 2, 100, {align: "center"});

    // Subtitle
    doc.setFontSize(16);
    doc.setFont("helvetica", "italic");
    doc.text("This certifies that", pageWidth / 2, 160, {align: "center"});

    // Recipient's Name
    const recipientName = `${userInfo.firstname} ${userInfo.lastname}`;
    doc.setFontSize(24);
    doc.setFont("times", "bold");
    doc.text(recipientName, pageWidth / 2, 200, {align: "center"});

    // Certification Message
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    const certificateMessage = `has successfully completed the final exam with a score of ${lastExamScore}. This certifies their hard work and achievement.`;
    doc.text(certificateMessage, pageWidth / 2, 250, {align: "center", maxWidth: pageWidth - 100});

    // Add some decorative lines
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 4, 280, (3 * pageWidth) / 4, 280);

    // Date and Signature
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 60, pageHeight - 100);
    doc.text("Signature:", pageWidth - 160, pageHeight - 100);

    // Optional placeholder for signature
    doc.setLineWidth(1);
    doc.line(pageWidth - 100, pageHeight - 110, pageWidth - 30, pageHeight - 110);

    // Save the PDF
    doc.save(`${userInfo.firstname} certificate.pdf`);
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
          <p>Ini adalah post test yang akan menguji pemahaman Anda setelah menyelesaikan semua materi. Pastikan Anda siap sebelum memulai.</p>
          {examStatus === "completed" && (
            <button className='get-certif' onClick={downloadCertificate}>
              Get Certificate
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamBox;
