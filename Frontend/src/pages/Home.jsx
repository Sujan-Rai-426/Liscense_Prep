import React, { useState, useEffect } from 'react';
import api from '../api';
import '../assets/css/Skeleton_Loader.css'; // Skeleton loader styles

function Home(props) {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedChapter, setExpandedChapter] = useState(null);

    useEffect(() => {
        api.get("/api/v1/chapters/")
            .then((response) => {
                setChapters(response.data);
            })
            .catch((error) => {
                console.error("Error fetching chapters: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const getOptionLabel = (index) => {
        const labels = ['a.', 'b.', 'c.', 'd.'];
        return labels[index] || '';
    };

    const renderSkeletons = () => {
        const skeletonArray = Array(5).fill(0);
        return skeletonArray.map((_, index) => (
            <div key={index} className="my-3 p-3 border rounded shadow-sm">
                <div className="skeleton skeleton-title mb-2"></div>
                <div className="skeleton skeleton-option mb-1"></div>
                <div className="skeleton skeleton-option mb-1"></div>
                <div className="skeleton skeleton-option mb-1"></div>
                <div className="skeleton skeleton-option mb-2"></div>
                <div className="skeleton skeleton-button"></div>
            </div>
        ));
    };

    const toggleChapterQuestions = (chapterId) => {
        setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
    };

    return (
        <div className="container mt-0 py-4">
            <div className='my-3 text-center text-danger fw-bold fs-4">'>
                <b> Some of the BCT License Past Questions </b>
                                    <br />
                <i> -- <u> More content will be added very soon </u> -- </i>
            </div>
            {loading ? (
                renderSkeletons()
            ) : (
                <div>
                    {Array.isArray(chapters) && chapters.map((chapter, chapterIndex) => (
                        <div key={chapter.id} className="mb-4">
                            {/* Chapter Heading */}
                            <h4
                                className="chapter-name text-primary fw-bold mb-3"
                                onClick={() => toggleChapterQuestions(chapter.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="badge bg-primary me-2">{chapterIndex + 1}</span>
                                <u>{chapter.name}</u>
                            </h4>

                            {/* Questions */}
                            {expandedChapter === chapter.id && (
                                <div>
                                    {chapter.questions.length > 0 ? (
                                        chapter.questions.map((question, index) => (
                                            <div key={question.id} className="mb-3 card shadow-sm" style={props.mode}>
                                                <div className="card-body">
                                                    <h5 className="card-title"><b>{index + 1}.</b> {question.question}</h5>
                                                    {question.options.map((option, idx) => (
                                                        <p key={option.id} className="mb-1">
                                                            {getOptionLabel(idx)} {option.option}
                                                        </p>
                                                    ))}
                                                    <div className="btn-group dropend my-2">
                                                        <button type="button" className="btn btn-outline-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Answer
                                                        </button>
                                                        <ul className="dropdown-menu mx-3">
                                                            <li>
                                                                <button className="dropdown-item text-success fw-bold mx-0 my-0 py-0 px-3" type="button">
                                                                    {question.correct_answer}
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No questions available for this chapter.</p>
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
