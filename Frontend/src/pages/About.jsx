import React from "react";

const About = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <br />
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                About License Preps
            </h1>
            <br />
            <p className="text-lg mb-4 text-gray-700">
                Welcome to <span className="font-semibold text-blue-500">License Preps</span> – your one-stop platform for preparing for the BCT Engineering License Examination!
            </p>
            <p className="text-gray-700 mb-4">
                Our goal is to help engineering graduates practice and prepare effectively using a collection of carefully categorized multiple-choice questions (MCQs) based on the official syllabus. We offer:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Subject-wise and chapter-wise MCQs</li>
                <li>Instant feedback after selecting an option</li>
                <li>Admin panel to add and manage questions</li>
                <li>Clean and responsive interface</li>
                <li>Dummy exam where you can test your knowledge</li>
            </ul>
            <p className="text-gray-700 mb-4">
                Whether you are just getting started or brushing up before the exam, License Preps provides the right tools and content to boost your confidence.
            </p>
            <p className="text-gray-700">
                Created with ❤️ using <strong>React</strong> and <strong>Django</strong>. Your success is our mission.
            </p>
        </div>
    );
};

export default About;
