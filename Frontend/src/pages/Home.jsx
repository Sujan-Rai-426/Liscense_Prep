import React, { useState, useEffect } from 'react';
import api from '../api';
import '../assets/css/Skeleton_Loader.css'; // Import skeleton loader CSS

function Home(props) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("/api/v1/questions/")
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching questions: ", error);
            })
            .finally(() => {
                setLoading(false); // Always stop loading (whether success or error)
            });
    }, []);

    // Helper to show labels like a., b., c., d.
    const getOptionLabel = (index) => {
        const labels = ['a.', 'b.', 'c.', 'd.'];
        return labels[index] || '';
    };

    // Create fake skeletons
    const renderSkeletons = () => {
        const skeletonArray = Array(5).fill(0); // Show 5 fake questions loading
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

    return (
        <div className="container mt-4">

            {loading ? (
                <div>
                    {renderSkeletons()}
                </div>
            ) : (
                <div>
                    {Array.isArray(questions) && questions.map((question, index) => (
                        <div key={question.id} className="my-3 card shadow-sm" style={props.mode}>
                            <div className="card-body" >

                                {/* Question */}
                                <h5 className="card-title"> <b>{index+1}.</b> {question.question}</h5>

                                {/* Options */}
                                {question.options.map((option, idx) => (
                                    <p key={option.id} className="option">
                                        {getOptionLabel(idx)} {option.option}
                                    </p>
                                ))}

                                {/* Answer Button */}
                                <div className="btn-group dropend my-2">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Answer:
                                    </button>
                                    <ul className="dropdown-menu mx-3">
                                        <li><button className="dropdown-item py-0 mx-2" type="button"> <b>{question.correct_answer}</b> </button></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default Home;
