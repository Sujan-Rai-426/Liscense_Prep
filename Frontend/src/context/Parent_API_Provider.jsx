import React, { useCallback, useEffect, useState } from 'react'
import { Parent_API_Context } from './Parent_API_Context'
import { fetchChapters, fetchQuestions } from './Parent_API_Fetch';



// -----------> Parent API Data Cache [localstorage] + Total Time Limit [TTL]
const CACHE_KEY = "Parent_API_Cache";
const CACHE_TTL = 1000 * 60 * 60 * 24 * 3 ; // 3 Days cache


const Parent_API_Provider = ( {children} ) => {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // initialize empty arry to store data from api of category, question
    const [data, setData] = useState( { chapters: [], questions: [] } )


    const loadAllData = useCallback( async() => {
        try{
            setLoading(true);
            
            //1. First check localstorage cache befor fetching data from server [if cached data available than use cached data]
            const cached_data = localStorage.getItem(CACHE_KEY); 
            if(cached_data){
                const parsed = JSON.parse(cached_data);     //<-- convert cached_data into javascript object to use 
                if(Date.now() - parsed.timestamp < CACHE_TTL){    //<--- check If the time passed is less than the limit of cache expire
                    setData(parsed.data);
                    setLoading(false);
                    return;
                }
            }
            

            //2. If not cached data than fresh fetch from server
            //Note: Promise.all takes an ARRAY []  <-- Promise.all fetch all we want at once and dont have to wait
            const [chapters, questions] = await Promise.all ([ fetchChapters(), fetchQuestions() ]);
            const freshData = { chapters, questions };
            setData(freshData);


            // 3. set fresh data to cache localstorage
            localStorage.setItem(
                CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: freshData,
                })
            )


        } catch(err) {
            console.log("Error",err)
            setError(" OOPS❗❗❗.. Failed to load data. Error: ", err);


        } finally {
            setLoading(false);
        }
    }, []);


    //  Run loadALLData code block on mount
    useEffect(() => {
        loadAllData();
    }, [loadAllData]);


    return (
        <Parent_API_Context.Provider 
            value={{...data, loading, error, reload: loadAllData}}
        >
            {children}
        </Parent_API_Context.Provider>
    )
}

export default Parent_API_Provider