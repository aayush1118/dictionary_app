import List from './components/List';
import { Route, Switch } from 'react-router-dom';
import Word from './components/Word';

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={List} />
				<Route exact path='/:id' component={Word} />
				<Route render={() => <h1>404: page not found</h1>} />
			</Switch>
		</>
	);
}

export default App;
