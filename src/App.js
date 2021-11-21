import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { ReviewPage } from './pages/ReviewPage';
import { SettingsPage } from './pages/SettingsPage';
import { ResultsPage } from './pages/ResultsPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { Login } from './components/Login';
import { useData } from './utils/DataContext';
import { LocalStoragePage } from './pages/LocalStoragePage';
import { EventHome } from './pages/EventHome';
import { ViewEventsPage } from './pages/ViewEventsPage';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Header } from './components/Header';
import { SEO } from './components/SEO';

const theme = createTheme({
	palette: {
		primary: {
			main: 'hsl(var(--primary-main))',
			light: 'hsl(var(--primary-light))',
			dark: 'hsl(var(--primary-dark))',
			contrastText: '#fff',
		},
		secondary: {
			main: 'hsl(var(--secondary-main))',
			light: 'hsl(var(--secondary-light))',
			dark: 'hsl(var(--secondary-dark))',
			contrastText: '#fff',
		},
	},
});

function App() {
	const { token } = useData();
	if (!(token === process.env.REACT_APP_TOKEN)) {
		return (
			<ThemeProvider theme={theme}>
				<SEO title="Login Page" description="Login page to event review" />
				<Header title="login page" />
				<Login />;
			</ThemeProvider>
		);
	}
	return (
		<>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/reviewPage" component={ReviewPage} />
						<Route exact path="/resultsPage" component={ResultsPage} />
						<Route exact path="/createEvent" component={CreateEventPage} />
						<Route exact path="/viewEvents" component={ViewEventsPage} />
						<Route exact path="/event" component={EventHome} />
						<Route exact path="/settings" component={SettingsPage} />

						<Route
							exact
							path="/localStoragePage"
							component={LocalStoragePage}
						/>
					</Switch>
				</Router>
			</ThemeProvider>
		</>
	);
}

export default App;
