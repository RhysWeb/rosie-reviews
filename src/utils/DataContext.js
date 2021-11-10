import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [data, setData] = useState({});
	const [token, setToken] = useState('');
	const [theme, setTheme] = useState('');
	const [currentEvent, setCurrentEvent] = useState({});

	const setValues = (values) => {
		setData((prevData) => ({
			...prevData,
			...values,
		}));
	};

	return (
		<DataContext.Provider
			value={{
				data,
				setValues,
				token,
				setToken,
				theme,
				setTheme,
				currentEvent,
				setCurrentEvent,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
