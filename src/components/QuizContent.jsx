import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {completeQuiz} from "../api/Quiz";
import Swal from "sweetalert2";

const Quiz = ({quizzes, subModuleId}) => {
  const [quizStates, setQuizStates] = useState(
    quizzes.map(() => ({
      selectedOption: null,
      isAnswered: false,
      isCorrect: null,
    }))
  );
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const navigate = useNavigate();

  // Calculate the score and total possible score
  const score = quizStates.reduce((acc, quizState, index) => acc + (quizState.isCorrect ? quizzes[index].score : 0), 0);
  const totalPossibleScore = quizzes.length * 10;

  useEffect(() => {
    const storedQuizStates = localStorage.getItem(`quizStates_${subModuleId}`);
    if (storedQuizStates) {
      setQuizStates(JSON.parse(storedQuizStates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`quizStates_${subModuleId}`, JSON.stringify(quizStates));
  }, [quizStates]);

  const handleOptionClick = (option) => {
    const selectedAnswer = option.trim().charAt(0);
    const correctAnswer = quizzes[currentQuizIndex].correctAnswer.trim();
    const isCorrect = selectedAnswer === correctAnswer;

    setQuizStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[currentQuizIndex] = {
        selectedOption: option,
        isAnswered: true,
        isCorrect: isCorrect,
      };
      return updatedStates;
    });
  };

  const changeQuestion = (offset) => {
    const targetIndex = currentQuizIndex + offset;
    if (targetIndex >= 0 && targetIndex < quizzes.length) {
      setCurrentQuizIndex(targetIndex);
    }
  };

  const handleFinishQuiz = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Apakah Anda yakin ingin menyelesaikan kuis?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, selesaikan!",
      cancelButtonText: "Tidak, lanjutkan",
    });

    if (result.isConfirmed) {
      setShowResults(true);
      setIsQuizCompleted(true);

      // Submit the score only if it passes the threshold
      if (score >= totalPossibleScore) {
        try {
          console.log("Submitting the quiz");
          await completeQuiz(subModuleId);
        } catch (error) {
          console.error("Failed to submit the quiz");
        }
      }
    }
  };

  const handleReviewQuizzes = () => {
    setShowResults(false);
    setIsReviewing(true);
    setCurrentQuizIndex(0);
  };

  const handleGoHome = () => {
    localStorage.removeItem(`quizStates_${subModuleId}`);
    navigate("/");
  };

  return (
    <div className='quiz-container'>
      {showResults ? (
        <div className='quiz-results'>
          <h3>Hasil Kuis</h3>
          <p>
            Skor Anda: {score} dari {totalPossibleScore}
          </p>
          {score < totalPossibleScore && <p style={{color: "red"}}>Anda tidak lulus kuis. Terus berlatih untuk meningkatkan skor Anda!</p>}
          <br />
          <button onClick={handleReviewQuizzes}>Tinjau Kuis</button>
          <button onClick={handleGoHome}>Kembali ke Beranda</button>
        </div>
      ) : (
        <div>
          <h3>{quizzes[currentQuizIndex].question}</h3>

          <ul>
            {quizzes[currentQuizIndex].options.split(",").map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`quiz-option ${
                  quizStates[currentQuizIndex].selectedOption === option
                    ? isReviewing
                      ? quizStates[currentQuizIndex].isCorrect
                        ? "correct"
                        : "incorrect"
                      : "selected"
                    : ""
                }`}
                style={{
                  cursor: quizStates[currentQuizIndex].isAnswered ? "not-allowed" : "pointer",
                }}>
                {option}
              </li>
            ))}
          </ul>
          <div className='quiz-navigation'>
            {currentQuizIndex > 0 && <button onClick={() => changeQuestion(-1)}>Sebelumnya</button>}
            {currentQuizIndex < quizzes.length - 1 ? (
              <button onClick={() => changeQuestion(1)}>Berikutnya</button>
            ) : (
              !isQuizCompleted && <button onClick={handleFinishQuiz}>Selesai</button>
            )}
            {isQuizCompleted && <button onClick={() => setShowResults(true)}>Lihat Hasil</button>}
          </div>

          {quizStates[currentQuizIndex].isAnswered &&
            isReviewing && ( // Conditional feedback
              <div className='quiz-feedback'>
                {quizStates[currentQuizIndex].isCorrect ? (
                  <p>Benar!</p>
                ) : (
                  <p>Salah! Jawaban yang benar adalah {quizzes[currentQuizIndex].correctAnswer}.</p>
                )}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
