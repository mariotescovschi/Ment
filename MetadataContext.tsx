import React, {createContext, useContext, useState} from 'react';
interface MetadataContextProps {
	userName: string;
	setUserName: React.Dispatch<React.SetStateAction<string>>;

	userPhoto: string;
	setUserPhoto: React.Dispatch<React.SetStateAction<string>>;
}

const MetadataContext = createContext<MetadataContextProps | undefined>(undefined);

export const useContextMetadata = () => {
	const context = useContext(MetadataContext);

	if (!context)
		throw new Error('useContextMetadata must be used within a MetadataProvider');

	return context;
};

export const MetadataProvider = ({ children }) => {
	const [userName, setUserName] = useState('');
	const [userPhoto, setUserPhoto] = useState('');
	return (
		<MetadataContext.Provider
			value={{
				userName, setUserName,
				userPhoto, setUserPhoto,
			}}>
			{children}
		</MetadataContext.Provider>
	);
};