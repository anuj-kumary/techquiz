import React, { createContext, useContext, useReducer } from "react";
import { DataStateType, DataContextType, QuizProviderProp, } from "../utils/DataContextType";
import { quizReducer } from "../Reducer/DataReducer";

const DataContext = createContext<DataContextType>({} as DataContextType)

const initialState: DataStateType = {
    answers: [],
};

const DataProvider = ({ children }: QuizProviderProp) => {
    const [state, dispatch] = useReducer(quizReducer, initialState)
    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}
const useData = () => useContext<DataContextType>(DataContext)

export { useData, DataProvider }