import React from 'react';

export function Timer() {
	return (
		<svg viewBox="-1.1 -1.1 2.2 2.2" width="400" height="400">
			<Background />
			<Slice />
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

export const Slice = createSlice();

function segmentTo() {
	return [0, -1];
}

export function createSlice(circleSegment = segmentTo) {
	return () => {
		const [arcX, arcY] = circleSegment();
		const pathData = `M 0 -1 A 1 1 0 0 1 ${arcX} ${arcY} L 0 0`;
		return <path d={pathData} />
	};
}
