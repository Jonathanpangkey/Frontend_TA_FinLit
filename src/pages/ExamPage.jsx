import React, {useState, useEffect} from "react";
import {completeExam, getExams} from "../api/Exam";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";

const ExamPage = () => {
  const [examStates, setExamStates] = useState([]);
  const [exams, setExams] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const navigate = useNavigate();

  // Calculate the score and total possible score
  const score = examStates.reduce((acc, examState, index) => acc + (examState.isCorrect ? exams[index].score : 0), 0);
  const totalPossibleScore = exams.length * 10;

  // Fetch exam data from API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examData = await getExams(); // Fetch data
        setExams(examData);
        console.log(examData);
        setExamStates(
          examData.map((exam) => ({
            question: exam.question,
            options: exam.options.split(","), // Split comma-separated options
            correctAnswer: exam.correctAnswer,
            selectedOption: null,
            isAnswered: false,
            isCorrect: null,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    const storedExamStates = localStorage.getItem(`examStates`);
    if (storedExamStates) {
      setExamStates(JSON.parse(storedExamStates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`examStates`, JSON.stringify(examStates));
  }, [examStates]);

  const handleOptionClick = (option) => {
    if (!examStates[currentQuestionIndex].isAnswered) {
      const selectedAnswer = option.trim().charAt(0);
      const correctAnswer = examStates[currentQuestionIndex].correctAnswer.trim();
      const isCorrect = selectedAnswer === correctAnswer;

      setExamStates((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[currentQuestionIndex] = {
          ...updatedStates[currentQuestionIndex],
          selectedOption: option,
          isAnswered: true,
          isCorrect: isCorrect,
        };
        return updatedStates;
      });
    }
  };

  // Generalized function to change question index based on offset
  const changeQuestion = (offset) => {
    const targetIndex = currentQuestionIndex + offset;
    if (targetIndex >= 0 && targetIndex < examStates.length) {
      setCurrentQuestionIndex(targetIndex);
    }
  };

  const handleFinishExam = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Apakah Anda yakin ingin menyelesaikan ujian?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, selesaikan!",
      cancelButtonText: "Tidak, lanjutkan",
    });

    if (result.isConfirmed) {
      setShowResults(true);
      setIsExamCompleted(true);

      // Submit the score only if it passes the threshold
      if (score >= totalPossibleScore) {
        try {
          console.log("Submitting the exam and updating progress...");
          const examProgress = {
            examCompleted: true,
            lastScore: score,
            totalPossibleScore: totalPossibleScore,
          };
          await completeExam(examProgress);
        } catch (error) {
          console.error("Failed to submit the exam and update progress.");
        }
      }
    }
  };

  const handleReviewExam = () => {
    setShowResults(false);
    setIsReviewing(true);
    setCurrentQuestionIndex(0);
  };

  const handleGoHome = () => {
    localStorage.removeItem(`examStates`);
    navigate("/");
  };

  if (loading) return <p>Memuat exam...</p>;

  return (
    <>
      <Navbar />
      <div className='exam-container material-display'>
        {showResults ? (
          <div className='exam-results'>
            <h3>Hasil Ujian</h3>
            <p>
              Skor Anda: {score} dari {totalPossibleScore}
            </p>
            {score < totalPossibleScore && <p style={{color: "red"}}>Anda tidak lulus ujian. Terus berlatih untuk meningkatkan skor Anda!</p>}
            <button onClick={handleReviewExam}>Tinjau Ujian</button>
            <button onClick={handleGoHome}>Kembali ke Beranda</button>
          </div>
        ) : (
          <div>
            {examStates.length > 0 && (
              <>
                <h3>{examStates[currentQuestionIndex].question}</h3>
                <ul>
                  {examStates[currentQuestionIndex].options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`exam-option ${
                        examStates[currentQuestionIndex].selectedOption === option
                          ? isReviewing
                            ? examStates[currentQuestionIndex].isCorrect
                              ? "correct"
                              : "incorrect"
                            : "selected"
                          : ""
                      }`}
                      style={{
                        cursor: examStates[currentQuestionIndex].isAnswered ? "not-allowed" : "pointer",
                      }}>
                      {option}
                    </li>
                  ))}
                </ul>
                <div className='exam-navigation'>
                  {currentQuestionIndex > 0 && <button onClick={() => changeQuestion(-1)}>Sebelumnya</button>}
                  {currentQuestionIndex < examStates.length - 1 ? (
                    <button onClick={() => changeQuestion(1)}>Berikutnya</button>
                  ) : (
                    !isExamCompleted && <button onClick={handleFinishExam}>Selesai</button>
                  )}
                  {isExamCompleted && <button onClick={() => setShowResults(true)}>Lihat Hasil</button>}
                </div>

                {examStates[currentQuestionIndex].isAnswered &&
                  isReviewing && ( // Conditional feedback
                    <div className='exam-feedback'>
                      {examStates[currentQuestionIndex].isCorrect ? (
                        <p>Benar!</p>
                      ) : (
                        <p>Salah! Jawaban yang benar adalah {examStates[currentQuestionIndex].correctAnswer}.</p>
                      )}
                    </div>
                  )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExamPage;
