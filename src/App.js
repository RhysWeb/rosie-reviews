import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { ReviewPage } from './pages/ReviewPage';
import { ResultsPage } from './pages/ResultsPage';
import { TestPage } from './pages/TestPage';
function App() {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/reviewPage" component={ReviewPage} />
					<Route exact path="/resultsPage" component={ResultsPage} />
					<Route exact path="/test" component={TestPage} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
