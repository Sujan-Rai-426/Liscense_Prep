import { createContext, useContext } from "react";


// ---> create and export context
export const Parent_API_Context = createContext();


// ---> use_Parent_API in context 
export const use_Parent_API = () => {
    const context = useContext(Parent_API_Context);
    if(!context){
        throw new Error(
            "useParentAPI must be wrapped inside Parent_API_Context"
        )
    }
    return context;
} 