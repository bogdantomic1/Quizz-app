// pages/game.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";


const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  

  useEffect(() => {
    // Fetch questions from the API when the component mounts
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);

      // Check if the selected answer is correct
      if (answer === questions[currentQuestionIndex].correct_answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  const handlePlayAgain = () => {
    window.location.reload();
    
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    // Game over, display score or redirect to a summary page
    return (
      <div className="text-center bg-purple-200 h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4 items-center justify-center">Game Over</h1>
        <p className="text-lg text-gray-800 mb-6">
          Your score: {score} / {questions.length}
        </p>
        <button
          onClick={handlePlayAgain}
          className="bg-indigo-700 text-white px-6 py-3 rounded-md mr-4 hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
        >
          Play Again
        </button>
        <Link href="/">
        <button
          className="bg-indigo-700 text-white px-6 py-3 rounded-md mr-4 hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
        >
          Go to home page
        </button>
        </Link>
      </div>
      
      
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];

  return (
    <>
    <div className="text-center bg-purple-200 h-screen  items-center justify-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Question {currentQuestionIndex + 1}
      </h1>
      <p className="text-lg text-gray-800 mb-6">{currentQuestion.question}</p>
      <ul>
        {answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={`cursor-pointer ${
              selectedAnswer === answer
                ? answer === currentQuestion.correct_answer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-blue-500 text-white"
            } p-2 rounded-md mb-2`}
          >
            {answer}
          </li>
        ))}
      </ul>
      {selectedAnswer !== null && (
        <button
          onClick={handleNextQuestion}
          className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
        >
          Next Question
        </button>
      )}
    </div>
    </>

  );
};

export default Game;
