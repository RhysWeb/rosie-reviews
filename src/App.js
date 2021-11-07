import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { ReviewPage } from './pages/ReviewPage';
import { ResultsPage } from './pages/ResultsPage';
import { TestPage } from './pages/TestPage';
import { Login } from './pages/Login';
import { useData } from './utils/DataContext';
import { LocalStoragePage } from './pages/LocalStoragePage';

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
					<Route exact path="/test" component={TestPage} />
					<Route exact path="/localStoragePage" component={LocalStoragePage} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
