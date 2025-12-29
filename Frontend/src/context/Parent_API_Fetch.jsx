
// =============================================
//      API Fetch
// =============================================

import React from "react"
import api from "../config/api";



// ----------> QUSESTIONS
export const fetchQuestions = async() => {
    const res = await api.get("/api/v1/questions/")
    return res.data;
}


// -----------> CHAPTERS
export const fetchChapters = async() =>{
    const res = await api.get("/api/v1/chapters/")
    return res.data;
}