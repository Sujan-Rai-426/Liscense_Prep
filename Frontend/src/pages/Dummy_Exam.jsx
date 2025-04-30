import React, { useEffect, useState } from 'react';
import api from '../api';
import '../assets/css/Dummy_Exam.css'; // Include styles for .timer and skeleton

function Dummy_Exam(props) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);
    const [loading, setLoading] = useState(true);


    // Function to fetch random questions from the API
    useEffect(() => {
        api.get('/api/v1/questions/')
            .then((response) => {
                const shuffled = response.data.sort(() => 0.5 - Math.random());
                setQuestions(shuffled.slice(0, 100));
            })
            .catch((error) => console.error('Error fetching questions:', error))
            .finally(() => setLoading(false));
    }, []);


    
    // Function to handle the countdown timer
    useEffect(() => {
        if (timeLeft <= 0 && !submitted) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, submitted]);


    // Function to format time in HH:MM:SS
    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };


    // Function to handle option change
    const handleOptionChange = (questionId, optionText) => {
        setAnswers({ ...answers, [questionId]: optionText });
    };

    // Function to handle form submission
    const handleSubmit = () => {
        setSubmitted(true);
    };

    // Calculate score based on answers and correct answers
    const score = questions.reduce((acc, q) => {
        const selected = answers[q.id];
        const correct = q.correct_answer?.[0]; // Assuming correct_answer is always a list with one string
        if (submitted && selected && selected === correct) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <div className="container py-5 position-relative">
            {/* Timer */}
            <div className="timer position-fixed top-0 end-0 p-3 bg-light shadow rounded m-3">
                ⏳ : {formatTime(timeLeft)}
            </div>

            {/* Skeleton while loading */}
            {loading && (
                Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="card my-3 shadow-sm p-3 placeholder-glow" style={props.mode}>
                        <h5 className="placeholder col-6 mb-2"></h5>
                        <div className="placeholder col-12 mb-1"></div>
                        <div className="placeholder col-10 mb-1"></div>
                        <div className="placeholder col-8 mb-1"></div>
                        <div className="placeholder col-9"></div>
                    </div>
                ))
            )}

            {/* Questions */}
            {!loading && questions.map((q, index) => (
                <div key={q.id} className="card my-3 shadow-sm" style={props.mode}>
                    <div className="card-body" >
                        <h5 className="card-title">
                            <b>{index + 1}.</b> {q.question}
                        </h5>
                        {q.options.map((opt) => (
                            <div key={opt.id} className="form-check">
                                <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    id={`q-${q.id}-opt-${opt.id}`}
                                    className="form-check-input"
                                    value={opt.option}
                                    disabled={submitted}
                                    checked={answers[q.id] === opt.option}
                                    onChange={() => handleOptionChange(q.id, opt.option)}
                                />
                                <label htmlFor={`q-${q.id}-opt-${opt.id}`} className="form-check-label">
                                    {opt.option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            {!submitted && !loading && (
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                    Submit Test
                </button>
            )}

            {/* Result */}
            {submitted && (
                <div className="alert alert-success mt-4">
                    <p><b>Test Submitted!</b></p>
                    <p>Total Score: <b>{score}</b> / {questions.length}</p>
                    <p>Percentage: <b>{((score / questions.length) * 100).toFixed(2)}%</b></p>
                </div>
            )}
        </div>
    );
}

export default Dummy_Exam;
