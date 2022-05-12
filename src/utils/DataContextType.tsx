import { ActionType } from './ActionType';

export type Dispatch = (action: ActionType) => void;
export type DataStateType = {
    answers: QuestionDataType[];
};
export type QuestionDataType = {
    questionIndex: number;
    selectedOption: number;
};

export type QuizProviderProp = {
    children: React.ReactNode;
};

export type DataContextType = {
    state: DataStateType;
    dispatch: Dispatch;
};


