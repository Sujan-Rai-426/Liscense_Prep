import React, { useState, useContext } from 'react';
import { Parent_API_Context } from '../context/Parent_API_Context'; 
import '../assets/css/Skeleton_Loader.css';
import "../assets/css/Home.css";

function Home(props) {
    const { chapters, loading, error } = useContext(Parent_API_Context);
    const [expandedChapter, setExpandedChapter] = useState(null);
    const [showAnswers, setShowAnswers] = useState({});

    const getOptionLabel = (index) => {
        const labels = ['a.', 'b.', 'c.', 'd.'];
        return labels[index] || '';
    };

    const toggleAnswer = (questionId) => {
        setShowAnswers(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const toggleChapterQuestions = (chapterId) => {
        setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
    };

    const renderSkeletons = () => {
        return Array(5).fill(0).map((_, index) => (
            <div key={index} className="card shadow mb-4" style={{ ...props.mode, border: 'none' }}>
                <div className="card-body skeleton-container">
                    <div className="skeleton-shimmer"></div>
                    <div className="skeleton-box skeleton-title mb-4"></div>
                    <div className="options-grid">
                        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton-box skeleton-text"></div>)}
                    </div>
                    <div className="mt-3">
                        <div className="skeleton-box skeleton-btn"></div>
                    </div>
                </div>
            </div>
        ));
    };

    if (error) return <div className="container mt-5 text-center"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container mt-0 py-4">
            <div className='my-4 text-center'>
                <h2 className="text-danger fw-bold">BCT License Past Questions</h2>
                <div className="d-inline-block px-3 py-1 rounded-pill header-badge">
                    <small className="fst-italic">-- More content will be added very soon --</small>
                </div>
            </div>

            {loading ? renderSkeletons() : (
                <div className="chapter-list">
                    {/* *************************************************** */}
                            {/*         CHAPTER TOPICS           */}
                    {/* *************************************************** */}
                    {Array.isArray(chapters) && chapters.map((chapter, chapterIndex) => (
                        <div key={chapter.id} className="mb-4">
                            {!expandedChapter && (
                                <h4 className="chapter-name text-primary fw-bold" 
                                    onClick={() => toggleChapterQuestions(chapter.id)}
                                    style={{ cursor: 'pointer' }}>
                                    <span className="badge bg-primary me-3">{chapterIndex + 1}</span>
                                    {chapter.name}
                                </h4>
                            )}


                    {/* *************************************************** */}
                            {/*       Contents  Inside CHAPTER       */}
                    {/* *************************************************** */}
                            {expandedChapter === chapter.id && (
                                <div className="animate__animated animate__fadeIn">
                                    <button className="btn btn-danger mb-4"
                                            onClick={() => setExpandedChapter(null)}>
                                        ← Back to Chapters List
                                    </button>
                                    
                                    <h3 className="mb-4 text-primary">{chapter.name}</h3>

                                    {chapter.questions?.length > 0 ? (
                                        chapter.questions.map((question, index) => {
                                            const isRevealed = showAnswers[question.id];

                                            return (
                                                <div key={question.id} className="card shadow mb-4" style={props.mode}>
                                                    <div className="card-body">
                                                        <h5 className="card-title mb-3">
                                                            <span className="text-danger me-2">{index + 1}.</span> 
                                                            {question.question}
                                                        </h5>
                                                        <div className="options-grid">
                                                            {question.options.map((option, idx) => {
                                                                // SAFETY: Convert to string before trimming to prevent crashes
                                                                const optionValue = String(option.option || "");
                                                                const correctValue = String(question.correct_answer || "");
                                                                
                                                                const isMatch = isRevealed && 
                                                                    optionValue.trim().toLowerCase() === correctValue.trim().toLowerCase();

                                                                return (
                                                                    <div key={option.id} 
                                                                            className={`option-item ${isMatch ? 'correct-glow' : ''}`}>
                                                                        <strong>{getOptionLabel(idx)}</strong> {option.option}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        
                                                        <div className="mt-3">
                                                            <button 
                                                                className={`btn btn-sm ${isRevealed ? 'btn-success' : 'btn-outline-success'}`}
                                                                onClick={() => toggleAnswer(question.id)}>
                                                                {isRevealed ? 'Hide Answer' : 'Show Answer'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="alert alert-info">No questions available.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;