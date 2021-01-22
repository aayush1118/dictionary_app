import List from './components/List';
import { Route, Switch } from 'react-router-dom';
import Word from './components/Word';

function App() {
	console.log(process.env.PORT);
	return (
		<>
			{/* <h1>{process.env.PORT}</h1> */}
			<h1>test</h1>
			{/* <Switch>
				<Route exact path='/' component={List} />
				<Route path='/view/:id' component={Word} />
			</Switch> */}
		</>
	);
}

export default App;
