import React, { useState } from 'react';
import './App.css';
import { Config } from './Config';
import { Timer } from './Timer';

export function App() {
	const [ time, setTime ] = useState({ mins: 10, secs: 0 });

	return (
		<div>
			<Timer />
		</div>
	);
}
