import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataProvider } from './utils/DataContext';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#43a047',
			light: '#76d275',
			dark: '#00701a',
			contrastText: '#fff',
		},
		secondary: {
			main: 'hsl(40, 60%, 70%)',
			//light:"hsl(35, 70%, 80%)",
			//dark:"#hsl(40, 50%, 50%)",
			contrastText: 'green',
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<DataProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</DataProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
