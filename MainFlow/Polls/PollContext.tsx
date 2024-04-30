import React, {createContext, useContext, useEffect, useState} from 'react';

interface userDataType {
    userName: string;
    userPhoto: string;
    userUID?: string;
}

interface answerType {
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

    questionIndex: number;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;

    answers: answerType[];
    setAnswers: React.Dispatch<React.SetStateAction<answerType[]>>;

    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;

}

const PollContext = createContext<PollContextProps | undefined>(undefined);

export const useContextPoll = () => {
    const context = useContext(PollContext);

    if (!context)
        throw new Error('useContextPoll must be used within a PollProvider');

    return context;
};


export const PollProvider = ({children}) => {

    const sampleQuestions: questionType[] = [
        {
            question: "What's your favorite fruit?",
            options: [
                { userName: 'Apple', userPhoto: 'https://example.com/apple.jpg' },
                { userName: 'Banana', userPhoto: 'https://example.com/banana.jpg' },
                { userName: 'Cherry', userPhoto: 'https://example.com/cherry.jpg' },
                { userName: 'Date', userPhoto: 'https://example.com/date.jpg' }
            ]
        },
        {
            question: "Favorite car brand?",
            options: [
                { userName: 'Toyota', userPhoto: 'https://example.com/toyota.jpg' },
                { userName: 'Ford', userPhoto: 'https://example.com/ford.jpg' },
                { userName: 'Honda', userPhoto: 'https://example.com/honda.jpg' },
                { userName: 'Tesla', userPhoto: 'https://example.com/tesla.jpg' }
            ]
        },

    ];

    const [questions, setQuestions] = useState<questionType[]>(sampleQuestions);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<answerType[]>([]);

    const [seconds, setSeconds] = useState(15);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);

        if (seconds === 0) {
            if (!isBreak) {
                setIsBreak(true);
                setSeconds(5);
            }
            else {
                setIsBreak(false);
                setQuestionIndex(index => (index + 1) % questions.length);
                setSeconds(15);
            }
        }

        return () => clearInterval(interval);
    }, [seconds, isBreak, setQuestionIndex, questions.length]);


    return (
        <PollContext.Provider
            value={{
                questions,
                setQuestions,
                questionIndex,
                setQuestionIndex,
                answers,
                setAnswers,
                seconds,
                setSeconds,
            }}>
            {children}
        </PollContext.Provider>
    );
};