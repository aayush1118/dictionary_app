import List from './components/List';
import { Route, Switch } from 'react-router-dom';
import Word from './components/Word';

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={List} />
				<Route path='/:id' component={Word} />
			</Switch>
		</>
	);
}

export default App;
