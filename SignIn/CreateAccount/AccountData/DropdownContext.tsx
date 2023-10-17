import React, { createContext, useContext, useState } from 'react';
import Countries from "./Countries";
interface Option {
    id: number;
    name: string;
}

type Zone = {
    id: number;
    name: string;
    schools?: {
        id: number;
        name: string;
    }[];
};

type Country = {
    id: number;
    name: string;
    image: any;
    zones?: Zone[];
}
interface CustomDropdownContextProps {
    isOpenCountry: boolean;
    setIsOpenCountry: React.Dispatch<React.SetStateAction<boolean>>;

    isOpenZone: boolean;
    setIsOpenZone: React.Dispatch<React.SetStateAction<boolean>>;

    isOpenSchool: boolean;
    setIsOpenSchool: React.Dispatch<React.SetStateAction<boolean>>;

    isOpenGrade: boolean;
    setIsOpenGrade: React.Dispatch<React.SetStateAction<boolean>>;

    isOpenClass: boolean;
    setIsOpenClass: React.Dispatch<React.SetStateAction<boolean>>;

    currentCountry: typeof Countries[number];
    setCurrentCountry: React.Dispatch<React.SetStateAction<typeof Countries[number]>>;

    currentZone: typeof Countries[number]['zones'][number];
    setCurrentZone: React.Dispatch<React.SetStateAction<typeof Countries[number]['zones'][number]>>;

    currentSchool: typeof Countries[0]['zones'][0]['schools'][0];
    setCurrentSchool: React.Dispatch<React.SetStateAction<typeof Countries[0]['zones'][0]['schools'][0]>>;

    searchQueryZone: string;
    setSearchQueryZone: React.Dispatch<React.SetStateAction<string>>;

    searchQuerySchool: string;
    setSearchQuerySchool: React.Dispatch<React.SetStateAction<string>>;

    currentGrade: number;
    setCurrentGrade: React.Dispatch<React.SetStateAction<number>>;
}

const CustomDropdownContext = createContext<CustomDropdownContextProps | undefined>(undefined);

export const useCustomDropdownContext = () => {

    const context = useContext(CustomDropdownContext);
    if (!context) {
        throw new Error('useCustomDropdownContext must be used within a CustomDropdownProvider');
    }
    return context;
};

export const CustomDropdownProvider = ({ children }) => {
    const [isOpenCountry, setIsOpenCountry] = useState(false);
    const [isOpenZone, setIsOpenZone] = useState(false);
    const [isOpenSchool, setIsOpenSchool] = useState(false);
    const [isOpenGrade, setIsOpenGrade] = useState(false);
    const [isOpenClass, setIsOpenClass] = useState(false);
    const [currentCountry, setCurrentCountry] = useState(Countries[0]);
    const [currentZone, setCurrentZone] = useState(Countries[0].zones[0]);
    const [searchQueryZone, setSearchQueryZone] = useState('');
    const [currentSchool, setCurrentSchool] = useState(Countries[0].zones[0].schools[0]);
    const [searchQuerySchool, setSearchQuerySchool] = useState('');
    const [currentGrade, setCurrentGrade] = useState(0);
    return (
        <CustomDropdownContext.Provider
            value={{
                currentGrade, setCurrentGrade,
                searchQuerySchool, setSearchQuerySchool,
                currentSchool, setCurrentSchool,
                searchQueryZone, setSearchQueryZone,
                isOpenCountry, setIsOpenCountry,
                isOpenZone, setIsOpenZone,
                isOpenSchool, setIsOpenSchool,
                isOpenGrade, setIsOpenGrade,
                isOpenClass, setIsOpenClass,
                currentCountry, setCurrentCountry,
                currentZone, setCurrentZone}}>
            {children}
        </CustomDropdownContext.Provider>
    );
};