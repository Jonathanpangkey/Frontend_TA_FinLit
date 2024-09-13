import React, {useState, useEffect} from "react";
import {getExams} from "../api/Exam";
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
  const navigate = useNavigate();

  // Fetch exam data from API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examData = await getExams(); // Fetch data
        setExams(examData);
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
      title: "Are you sure?",
      text: "Are you sure you want to finish the exam?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, finish it!",
      cancelButtonText: "No, keep going",
    });

    if (result.isConfirmed) {
      setShowResults(true);
      setIsExamCompleted(true);
    }
  };

  const handleReviewExam = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
  };

  const score = examStates.reduce((acc, examState, index) => acc + (examState.isCorrect ? exams[index].score : 0), 0);
  const totalPossibleScore = examStates.length * 10;
  const passingScore = totalPossibleScore * 0.8;

  if (loading) return <p>Loading exam...</p>;

  return (
    <>
      <Navbar />
      <div className='exam-container material-display'>
        {showResults ? (
          <div className='exam-results'>
            <h3>Exam Results</h3>
            <p>
              Your Score: {score} out of {totalPossibleScore}
            </p>
            {score < passingScore && <p style={{color: "red"}}>You didn't pass the exam. Keep practicing to improve your score!</p>}
            <button onClick={handleReviewExam}>Review Exam</button>
            <button onClick={() => navigate("/home")}>Go Home</button>
          </div>
        ) : (
          <div>
            <h3>{examStates[currentQuestionIndex].question}</h3>
            <ul>
              {examStates[currentQuestionIndex].options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`exam-option ${
                    examStates[currentQuestionIndex].selectedOption === option
                      ? examStates[currentQuestionIndex].isCorrect
                        ? "correct"
                        : "incorrect"
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
              {currentQuestionIndex > 0 && <button onClick={() => changeQuestion(-1)}>Previous</button>}
              {currentQuestionIndex < examStates.length - 1 ? (
                <button onClick={() => changeQuestion(1)}>Next</button>
              ) : (
                !isExamCompleted && <button onClick={handleFinishExam}>Finish</button>
              )}
              {isExamCompleted && <button onClick={() => setShowResults(true)}>Go to Results</button>}
            </div>

            {examStates[currentQuestionIndex].isAnswered && (
              <div className='exam-feedback'>
                {examStates[currentQuestionIndex].isCorrect ? (
                  <p>Correct!</p>
                ) : (
                  <p>Incorrect! The correct answer is {examStates[currentQuestionIndex].correctAnswer}.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExamPage;
