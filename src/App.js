import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { ReviewPage } from './pages/ReviewPage';
function App() {
	return (
		<>
			<Header />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/reviewPage" component={ReviewPage} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
