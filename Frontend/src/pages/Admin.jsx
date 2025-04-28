import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AddQuestion(props) {

  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the payload for the POST request
    const payload = {
      question,
      options: options.map((opt) => ({ option: opt })),
      correct_answer: [correctAnswer], // Assuming correct_answer should be an array
    };

    // Call the POST API function
    postQuestion(payload);
  };

  const postQuestion = (questionData) => {
    api
      .post('/api/v1/questions/', questionData)
      .then((response) => {
        alert("Question added successfully!");
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
      })
      .catch((error) => {
        console.error("Error adding question:", error);
        alert("Failed to add question.");
      });
  };


  
  //  Logout function
  const handleLogout = () => {
    // Remove the token and loggedIn status from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    
    // Redirect to the login page
    navigate('/admin_login');
  };



  return (

    <form onSubmit={handleSubmit} className="p-4">
    <div className="card shadow p-4" style={props.mode}>
      <h2 className="mb-4 text-center">Add New Question</h2>
  
      <div className="mb-3">
        <label className="form-label">Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="form-control"
          placeholder="Enter your question here"
          style={{
            backgroundColor: props.mode.backgroundColor === '#f5f7fa' ? '#f0f2f5' : '#2e2e42',
            color: props.mode.color,
            border: "1px solid #ced4da",
            transition: "all 0.3s ease"
          }}
        />
      </div>
  
      {options.map((opt, index) => (
        <div key={index} className="mb-3">
          <label className="form-label">Option {String.fromCharCode(65 + index)}</label>
          <input
            type="text"
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="form-control"
            placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
            style={{
              backgroundColor: props.mode.backgroundColor === '#f5f7fa' ? '#f0f2f5' : '#2e2e42',
              color: props.mode.color,
              border: "1px solid #ced4da",
              transition: "all 0.3s ease"
            }}
          />
        </div>
      ))}
  
      <div className="mb-3">
        <label className="form-label">Correct Answer (exact text)</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="form-control"
          placeholder="Enter the correct answer text"
          style={{
            backgroundColor: props.mode.backgroundColor === '#f5f7fa' ? '#f0f2f5' : '#2e2e42',
            color: props.mode.color,
            border: "1px solid #ced4da",
            transition: "all 0.3s ease"
          }}
        />
      </div>
  
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Add Question
        </button>
        <button onClick={handleLogout} type="button" className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  </form>
  
  );
}

export default AddQuestion;
