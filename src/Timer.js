import React from 'react';

export function Timer() {
	return (
		<svg viewBox="-1.1 -1.1 2.2 2.2" width="400" height="400">
			<Background />
			<Foreground />
		</svg>
	);
}

export function Background() {
	return <circle cx="0" cy="0" r="1" stroke="none" fill="white"/>;
}

export function Foreground() {
	return <circle cx="0" cy="0" r="1" stroke="black" fill="none" strokeWidth="0.02"/>;
}
