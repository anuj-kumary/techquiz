import { ActionType } from "../utils/ActionType";
import { DataStateType } from "../utils/DataContextType";


export const quizReducer = (
    state: DataStateType,
    action: ActionType
): DataStateType => {
    switch (action.type) {
        case 'ADD_QUESTION_DATA':
            return {
                ...state,
                answers: state.answers.some(
                    (el) => el.questionIndex === action.payload.questionIndex
                )
                    ? state.answers.map((el) => {
                        return el.questionIndex === action.payload.questionIndex
                            ? action.payload
                            : el;
                    })
                    : [...state.answers, { ...action.payload }],
            };
        case 'RECOVER_ANSWER_DATA':
            return {
                ...state,
                answers: [...action.payload.sessionData],
            };
        case 'RESET':
            return { ...state, answers: [] };
    }
};