import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [data, setData] = useState({});
	const [token, setToken] = useState('');
	const [theme, setTheme] = useState('');
	const [updateCount, setUpdateCount] = useState(0);
	const [currentEvent, setCurrentEvent] = useState({});
	const [deleteEvent, setDeleteEvent] = useState(false);

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
				deleteEvent,
				setDeleteEvent,
				updateCount,
				setUpdateCount,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
