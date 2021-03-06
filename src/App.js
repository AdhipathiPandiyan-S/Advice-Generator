import { useState, useEffect } from 'react';
import './App.css';
import { ReactComponent as Divider } from './assets/images/pattern-divider-mobile.svg';
import { ReactComponent as IconDice } from './assets/images/icon-dice.svg';

function App() {
	const [ advice, setAdvice ] = useState({
		quote: null,
		number: 0,
	});
	const [ disableButton, setDisableButton ] = useState(false);

	useEffect(() => {
		updateAdvice();
	}, []);

	const updateAdvice = async () => {
		try {
			setDisableButton(true);
			setAdvice({
				quote: null,
				number: 0,
			});
			const response = await fetch('https://api.adviceslip.com/advice');
			const data = await response.json();
			const { slip } = data;
			if (slip.advice === advice.quote) {
				setDisableButton(true);
				setAdvice({
					quote: null,
					number: 0,
				});
				updateAdvice();
			} else {
				setAdvice({ quote: slip.advice, number: slip.id });
				setDisableButton(false);
			}
		} catch (error) {
			console.error(error);
			setAdvice({
				quote: 'Something Wrong, Please try again later',
				number: 0,
			});
		}
	};

	return (
		<main className="App">
			<section className="card">
				<h1 className="card-head">ADVICE #{advice.number}</h1>
				{advice.quote == null ? (
					<h2 className="card-advice">Loading...</h2>
				) : (
					<h2 className="card-advice">“{advice.quote}”</h2>
				)}
				<div className="card-divider">
					<Divider />
				</div>
				<button
					disabled={disableButton}
					title="Button to fetch new advice"
					type="button"
					onClick={updateAdvice}
					className="card-dice"
				>
					<IconDice />
				</button>
			</section>
		</main>
	);
}

export default App;
