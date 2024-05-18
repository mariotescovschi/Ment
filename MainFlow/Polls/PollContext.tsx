import React, {createContext, useContext, useEffect, useState} from 'react';

export interface Ment {
    to: string
    question: string
    options: string[]
}

export interface userDataType {
    userName: string;
    userPhoto: string;
    userUID: string;
}

export interface answerType {
    userData: userDataType;
    question: string;
}

export interface questionType {
    question: string;
    options: userDataType[];
}

interface PollContextProps {
    questions: questionType[];
    setQuestions: React.Dispatch<React.SetStateAction<questionType[]>>;

    answers: answerType[];
    setAnswers: React.Dispatch<React.SetStateAction<answerType[]>>;
}

const PollContext = createContext<PollContextProps | undefined>(undefined);

export const useContextPoll = () => {
    const context = useContext(PollContext);

    if (!context)
        throw new Error('useContextPoll must be used within a PollProvider');

    return context;
};


export const PollProvider = ({children}) => {
    const [questions, setQuestions] = useState<questionType[]>();
    const [answers, setAnswers] = useState<answerType[]>([]);


    return (
        <PollContext.Provider
            value={{
                questions,
                setQuestions,
                answers,
                setAnswers,
            }}>
            {children}
        </PollContext.Provider>
    );
};