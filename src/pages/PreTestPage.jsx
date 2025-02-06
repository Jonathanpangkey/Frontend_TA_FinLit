import React, {useState, useEffect} from "react";
import {completePreTest, getPreTests} from "../api/PreTest";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";

const PreTestPage = () => {
  const [preTestStates, setPreTestStates] = useState([]);
  const [preTests, setPreTests] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isPreTestCompleted, setIsPreTestCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500); // Set the time limit to 1500 seconds (25 minutes)
  const navigate = useNavigate();

  // Calculate the score and total possible score
  const correctAnswers = preTestStates.reduce((acc, preTestState) => acc + (preTestState.isCorrect ? 1 : 0), 0);
  const totalQuestions = preTests.length;
  const score = (correctAnswers / totalQuestions) * 100;
  const passingScore = 75;

  // Fetch pre-test data from API
  useEffect(() => {
    const fetchPreTests = async () => {
      try {
        const preTestData = await getPreTests(); // Fetch data
        setPreTests(preTestData);
        console.log(preTestData);
        setPreTestStates(
          preTestData.map((preTest) => ({
            question: preTest.question,
            options: preTest.options.split(","), // Split comma-separated options
            correctAnswer: preTest.correctAnswer,
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

    fetchPreTests();
  }, []);

  useEffect(() => {
    const storedPreTestStates = localStorage.getItem(`preTestStates`);
    if (storedPreTestStates) {
      setPreTestStates(JSON.parse(storedPreTestStates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`preTestStates`, JSON.stringify(preTestStates));
  }, [preTestStates]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isPreTestCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleFinishPreTest(true); // Auto-submit when time is up
    }
  }, [timeLeft, isPreTestCompleted]);

  const handleOptionClick = (option) => {
    if (!preTestStates[currentQuestionIndex].isAnswered) {
      const selectedAnswer = option.trim().charAt(0);
      const correctAnswer = preTestStates[currentQuestionIndex].correctAnswer.trim();
      const isCorrect = selectedAnswer === correctAnswer;

      setPreTestStates((prevStates) => {
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
    if (targetIndex >= 0 && targetIndex < preTestStates.length) {
      setCurrentQuestionIndex(targetIndex);
    }
  };

  const handleFinishPreTest = async (autoSubmit = false) => {
    if (!autoSubmit) {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Apakah Anda yakin ingin menyelesaikan pre-test?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, selesaikan!",
        cancelButtonText: "Tidak, lanjutkan",
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    setShowResults(true);
    setIsPreTestCompleted(true);

    // Submit the score regardless of whether it passes the threshold
    try {
      console.log("Submitting the pre-test and updating progress...");
      const preTestProgress = {
        preTestCompleted: true,
        lastScore: score,
      };
      await completePreTest(preTestProgress);
    } catch (error) {
      console.error("Failed to submit the pre-test and update progress.");
    }
  };

  const handleReviewPreTest = () => {
    setShowResults(false);
    setIsReviewing(true);
    setCurrentQuestionIndex(0);
  };

  const handleGoHome = () => {
    localStorage.removeItem(`preTestStates`);
    navigate("/");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (loading) return <p>Memuat pre-test...</p>;

  return (
    <>
      <Navbar />
      <div className='exam-container material-display'>
        {showResults ? (
          <div className='exam-results'>
            <h3>Hasil Pre-Test</h3>
            <p>Skor Anda: {score.toFixed(0)} dari 100</p>
            {score < passingScore && <p style={{color: "red"}}>Anda tidak lulus pre-test. Terus berlatih untuk meningkatkan skor Anda!</p>}
            <button onClick={handleReviewPreTest}>Tinjau Pre-Test</button>
            <button onClick={handleGoHome}>Kembali ke Beranda</button>
          </div>
        ) : (
          <div>
            <div className='exam-timer'>
              <p>Sisa Waktu: {formatTime(timeLeft)}</p>
            </div>
            {preTestStates.length > 0 && (
              <>
                <h3>{preTestStates[currentQuestionIndex].question}</h3>
                <ul>
                  {preTestStates[currentQuestionIndex].options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`exam-option ${
                        preTestStates[currentQuestionIndex].selectedOption === option
                          ? isReviewing
                            ? preTestStates[currentQuestionIndex].isCorrect
                              ? "correct"
                              : "incorrect"
                            : "selected"
                          : ""
                      }`}
                      style={{
                        cursor: preTestStates[currentQuestionIndex].isAnswered ? "not-allowed" : "pointer",
                      }}>
                      {option}
                    </li>
                  ))}
                </ul>
                <div className='exam-navigation'>
                  {currentQuestionIndex > 0 && <button onClick={() => changeQuestion(-1)}>Sebelumnya</button>}
                  {currentQuestionIndex < preTestStates.length - 1 ? (
                    <button onClick={() => changeQuestion(1)}>Berikutnya</button>
                  ) : (
                    !isPreTestCompleted && <button onClick={() => handleFinishPreTest()}>Selesai</button>
                  )}
                  {isPreTestCompleted && <button onClick={() => setShowResults(true)}>Lihat Hasil</button>}
                </div>

                {preTestStates[currentQuestionIndex].isAnswered &&
                  isReviewing && ( // Conditional feedback
                    <div className='exam-feedback'>
                      {preTestStates[currentQuestionIndex].isCorrect ? (
                        <p>Benar!</p>
                      ) : (
                        <p>Salah! Jawaban yang benar adalah {preTestStates[currentQuestionIndex].correctAnswer}.</p>
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

export default PreTestPage;
