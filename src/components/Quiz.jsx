// src/components/Quiz.jsx
import React, {useState} from "react";
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

  // Generalized function to change quiz index based on offset
  const changeQuestion = (offset) => {
    const targetIndex = currentQuizIndex + offset;
    if (targetIndex >= 0 && targetIndex < quizzes.length) {
      setCurrentQuizIndex(targetIndex);
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
      setShowResults(true);
      setIsQuizCompleted(true);

      const totalPossibleScore = quizzes.length * 10;

      // Calculate the score
      const score = quizStates.reduce((acc, quizState, index) => acc + (quizState.isCorrect ? quizzes[index].score : 0), 0);

      // Submit the score only if it passes the threshold
      if (score >= totalPossibleScore) {
        try {
          await completeQuiz(subModuleId, score);
        } catch (error) {
          console.error("Failed to submit the quiz score.");
        }
      }
    }
  };

  const handleReviewQuizzes = () => {
    setShowResults(false);
    setCurrentQuizIndex(0);
  };

  const score = quizStates.reduce((acc, quizState, index) => acc + (quizState.isCorrect ? quizzes[index].score : 0), 0);

  const totalPossibleScore = quizzes.length * 10;

  return (
    <div className='quiz-container'>
      {showResults ? (
        <div className='quiz-results'>
          <h3>Quiz Results</h3>
          <p>
            Your Score: {score} out of {totalPossibleScore}
          </p>
          {score < totalPossibleScore && <p style={{color: "red"}}>You didn't pass the quiz. Keep practicing to improve your score!</p>}
          <br />
          <button onClick={handleReviewQuizzes}>Review Quizzes</button>
          <button onClick={() => navigate("/home")}>Go Home</button>
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
            {currentQuizIndex > 0 && <button onClick={() => changeQuestion(-1)}>Previous</button>}
            {currentQuizIndex < quizzes.length - 1 ? (
              <button onClick={() => changeQuestion(1)}>Next</button>
            ) : (
              !isQuizCompleted && <button onClick={handleFinishQuiz}>Finish</button>
            )}
            {isQuizCompleted && <button onClick={() => setShowResults(true)}>Go to Results</button>}
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
