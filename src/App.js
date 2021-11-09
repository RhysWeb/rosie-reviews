import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { ReviewPage } from './pages/ReviewPage';
import { ResultsPage } from './pages/ResultsPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { Login } from './pages/Login';
import { useData } from './utils/DataContext';
import { LocalStoragePage } from './pages/LocalStoragePage';
import { EventHome } from './pages/EventHome';
import { ViewEventsPage } from './pages/ViewEventsPage';

function App() {
	const { token } = useData();
	if (!(token == process.env.REACT_APP_TOKEN)) {
		return <Login />;
	}
	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/reviewPage" component={ReviewPage} />
					<Route exact path="/resultsPage" component={ResultsPage} />
					<Route exact path="/createEvent" component={CreateEventPage} />
					<Route exact path="/viewEvents" component={ViewEventsPage} />
					<Route exact path="/event" component={EventHome} />

					<Route exact path="/localStoragePage" component={LocalStoragePage} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
