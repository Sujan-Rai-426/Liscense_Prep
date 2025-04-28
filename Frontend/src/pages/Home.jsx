import React, { useState, useEffect } from 'react'
import api from '../api'

function Home() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        api
            .get("/api/v1/questions/")
            .then((response) => {
                setQuestions(response.data);
                console.log("Fetched Questions:", response.data); // 👈 to show response is console
            })
            .catch((error) => console.error("Error fetching questions: ", error));
    }, []);



    //To Show options in labeled formate a. , b. , c. , d.
    const getOptionLabel = (index) => {
        const labels = ['a.', 'b.', 'c.', 'd.'];
        return labels[index] || ''; // Default empty if more than 4 options
    };


    return (
        <div>
            {Array.isArray(questions) && questions.map((question, index) => (
                <div key={question.id} className="my-3">
                    <div className="card-body">

                        {/* Question */}
                        <h5 className="card-title"> <b>{index+1}.</b> {question.question}</h5>

                         {/*Flexbox Display options with labels */}
                        {question.options.map((option, index) => (
                            <p key={option.id} className="option">
                                {getOptionLabel(index)} {option.option}
                            </p>
                        ))}


                        {/* <------ Dropdown button to show the correct answer -----> */}
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
    )
}

export default Home
