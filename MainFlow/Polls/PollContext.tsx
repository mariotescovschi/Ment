import React, {createContext, useContext, useState} from 'react';

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
    to: string
    options: string[]
}

export interface questionType {
    question: string;
    options: userDataType[];
}

interface PollContextProps {
    questions: questionType[];
    setQuestions: React.Dispatch<React.SetStateAction<questionType[]>>;

    pollIndex: number;
    setPollIndex: React.Dispatch<React.SetStateAction<number>>;
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
    const [pollIndex, setPollIndex] = useState<number>(-1);

    return (
        <PollContext.Provider
            value={{
                questions,
                setQuestions,
                pollIndex,
                setPollIndex,
            }}>
            {children}
        </PollContext.Provider>
    );
};