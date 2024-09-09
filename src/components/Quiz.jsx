// src/components/Quiz.jsx
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {completeQuiz} from "../api/Quiz";
import Swal from "sweetalert2";

const Quiz = ({quizzes, subModuleId}) => {
  const [quizStates, setQuizStates] = useState(
    quizzes.map((quiz) => ({
      selectedOption: null,
      isAnswered: false,
      isCorrect: null,
    }))
  );

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (!quizStates[currentQuizIndex].isAnswered) {
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
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePreviousQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
    }
  };

  const handleFinishQuiz = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to finish the quiz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, finish it!",
      cancelButtonText: "No, keep going",
    });

    if (result.isConfirmed) {
      // Note the change here
      setShowResults(true);

      // Calculate the score
      const score = quizStates.reduce((acc, quizState, index) => acc + (quizState.isCorrect ? quizzes[index].score : 0), 0);

      // Check if the score meets the required threshold (20 points)
      if (score >= 20) {
        try {
          await completeQuiz(subModuleId, score);
          console.log("Quiz completed and score submitted successfully.");
        } catch (error) {
          console.error("Failed to submit the quiz score.");
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Insufficient Score",
          text: `You need at least 20 points to complete the quiz. Your score is ${score}.`,
        });
      }
    }
  };

  const handleReviewQuizzes = () => {
    setShowResults(false);
    setCurrentQuizIndex(0);
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  const score = quizStates.reduce((acc, quizState, index) => acc + (quizState.isCorrect ? quizzes[index].score : 0), 0);

  return (
    <div className='quiz-container'>
      {showResults ? (
        <div className='quiz-results'>
          <h3>Quiz Results</h3>
          <p>
            Your Score: {score} out of {quizzes.length * quizzes[0].score}
          </p>
          <button onClick={handleReviewQuizzes}>Review Quizzes</button>
          <button onClick={handleGoHome}>Go Home</button>
        </div>
      ) : (
        <div className=''>
          <h3>{quizzes[currentQuizIndex].question}</h3>
          <ul>
            {quizzes[currentQuizIndex].options.split(",").map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`quiz-option ${
                  quizStates[currentQuizIndex].selectedOption === option ? (quizStates[currentQuizIndex].isCorrect ? "correct" : "incorrect") : ""
                }`}
                style={{
                  cursor: quizStates[currentQuizIndex].isAnswered ? "not-allowed" : "pointer",
                }}>
                {option}
              </li>
            ))}
          </ul>
          <div className='quiz-navigation'>
            {currentQuizIndex > 0 && <button onClick={handlePreviousQuiz}>Previous</button>}
            {currentQuizIndex < quizzes.length - 1 ? (
              <button onClick={handleNextQuiz}>Next</button>
            ) : (
              <button onClick={handleFinishQuiz}>Finish</button>
            )}
          </div>
          {quizStates[currentQuizIndex].isAnswered && (
            <div className='quiz-feedback'>
              {quizStates[currentQuizIndex].isCorrect ? (
                <p>Correct!</p>
              ) : (
                <p>Incorrect! The correct answer is {quizzes[currentQuizIndex].correctAnswer}.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
