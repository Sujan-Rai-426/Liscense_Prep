import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Parent_API_Context } from '../context/Parent_API_Context'; 
import '../assets/css/Dummy_Exam.css';

function Dummy_Exam(props) {
    const { questions: allQuestions, loading: apiLoading } = useContext(Parent_API_Context);

    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);

    // Shuffle and pick 100 questions only when allQuestions change
    const examQuestions = useMemo(() => {
        if (!allQuestions || allQuestions.length === 0) return [];
        return [...allQuestions]
            .sort(() => 0.5 - Math.random())
            .slice(0, 100);
    }, [allQuestions]);

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0 && !submitted) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => {
            if (!submitted) setTimeLeft((t) => t - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, submitted]);

    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleOptionChange = (questionId, optionText) => {
        if (!submitted) {
            setAnswers({ ...answers, [questionId]: optionText });
        }
    };

    const handleSubmit = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSubmitted(true);
    };

    const score = examQuestions.reduce((acc, q) => {
        const selected = answers[q.id];
        const correct = String(q.correct_answer || "").trim().toLowerCase();
        if (submitted && selected && String(selected).trim().toLowerCase() === correct) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <div className="container dummy-exam-container py-1">
            {/* Sticky Timer */}
            <div className="timer-box position-fixed shadow-lg p-3 rounded-pill" style={{zIndex: 1050}}>
                {timeLeft > 0 ? `⏳ ${formatTime(timeLeft)}` : "⌛ Time's Up!"}
            </div>

            <div className="text-center mb-5">
                <h2 className="fw-bold text-primary">Mock Examination</h2>
                <p className="text-muted">100 Questions • 2 Hours • All the best!</p>
            </div>

            {/* Skeleton Loading State */}
            {apiLoading && (
                Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="card my-3 shadow-sm p-4 placeholder-glow" style={props.mode}>
                        <div className="placeholder col-8 mb-4 py-3"></div>
                        <div className="placeholder col-12 mb-2 py-2"></div>
                        <div className="placeholder col-12 mb-2 py-2"></div>
                    </div>
                ))
            )}

            {/* Results Overview */}
            {submitted && (
                <div className="card result-card shadow mb-5 p-4 bg-success bg-opacity-10">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h3 className="text-success fw-bold">Test Completed!</h3>
                            <p className="mb-0">You scored <b>{score}</b> out of <b>{examQuestions.length}</b></p>
                            <h4 className="mt-2">Grade: {((score / examQuestions.length) * 100).toFixed(1)}%</h4>
                        </div>
                        <div className="col-md-4 text-center">
                            <button className="btn btn-outline-success" onClick={() => window.location.reload()}>
                                Retake Exam
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Questions List */}
            {!apiLoading && examQuestions.map((q, index) => (
                <div key={q.id} className="card question-card my-4 shadow-sm" style={props.mode}>
                    <div className="card-body p-0">
                        <h5 className="card-title mb-4">
                            <span className="text-primary me-2">Q{index + 1}.</span> {q.question}
                        </h5>
                        
                        <div className="options-list">
                            {q.options.map((opt) => {
                                const isSelected = answers[q.id] === opt.option;
                                const isCorrect = String(opt.option).trim().toLowerCase() === String(q.correct_answer).trim().toLowerCase();
                                
                                let statusClass = "";
                                if (submitted) {
                                    if (isCorrect) statusClass = "correct-reveal";
                                    else if (isSelected && !isCorrect) statusClass = "wrong-selection";
                                }

                                return (
                                    <div key={opt.id} className="option-container">
                                        <input
                                            type="radio"
                                            name={`q-${q.id}`}
                                            id={`q-${q.id}-opt-${opt.id}`}
                                            className="option-input"
                                            checked={isSelected}
                                            disabled={submitted}
                                            onChange={() => handleOptionChange(q.id, opt.option)}
                                        />
                                        <label 
                                            htmlFor={`q-${q.id}-opt-${opt.id}`} 
                                            className={`option-label ${statusClass}`}
                                        >
                                            {opt.option}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}

            {!submitted && !apiLoading && examQuestions.length > 0 && (
                <div className="text-center mt-5 mb-5">
                    <button className="btn btn-primary btn-lg px-5 shadow" onClick={handleSubmit}>
                        Submit My Answers
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dummy_Exam;