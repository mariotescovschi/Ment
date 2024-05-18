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

    questionIndex: number;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;

    pollIndex: number;
    setPollIndex: React.Dispatch<React.SetStateAction<number>>;

    ments: Ment[];
    setMents: React.Dispatch<React.SetStateAction<Ment[]>>;

    answer: answerType;
    setAnswer: React.Dispatch<React.SetStateAction<answerType>>;
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
    const [ments, setMents] = useState<Ment[]>([]);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [answer, setAnswer] = useState<answerType>();

    useEffect(() => {
        if(questionIndex > 0) {
            setMents([...ments,
                {
                    to: answer.to,
                    question: questions[questionIndex - 1].question,
                    options: answer.options
                }
            ]);
        }
    }, [questionIndex]);

    return (
        <PollContext.Provider
            value={{
                questions,
                setQuestions,
                pollIndex,
                setPollIndex,
                ments,
                setMents,
                questionIndex,
                setQuestionIndex,
                answer,
                setAnswer,
            }}>
            {children}
        </PollContext.Provider>
    );
};