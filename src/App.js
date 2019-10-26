import React, { useState } from 'react';
import './App.css';
import { Config } from './Config';
import { Timer } from './Timer';

export function App() {
	const [ timerState, setTimerState ] = useState('stopped');

	return (
		<div>
			<Config startTimer={()=> setTimerState('running')} />
			<Timer state={timerState} />
		</div>
	);
}
