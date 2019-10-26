import React from 'react';

export function Config({startTimer}) {
	return (
		<div>
			<a className="start-timer" href="#" onClick={startTimer()}>Start</a>
		</div>
	);
}
