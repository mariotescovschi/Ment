import React, { createContext, useContext, useState } from 'react';

interface ContinueContextProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;

    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
}

const ContinueContext = createContext<ContinueContextProps | undefined>(undefined);

export const useContinueContext = () => {

    const context = useContext(ContinueContext);
    if (!context) {
        throw new Error('useContinueContext must be used within a ContinueProvider');
    }
    return context;
};

export const ContinueProvider = ({ children }) => {
        const [name, setName] = useState('');
        const [lastName, setLastName] = useState('');
        return (
        <ContinueContext.Provider
            value={{
                name, setName,
                lastName, setLastName
        }}>
            {children}
        </ContinueContext.Provider>
    );
};