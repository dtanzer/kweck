import React from 'react';
import './Timer.css';
import { percentFrom, segmentTo } from './segment';

export const Timer = createTimer();

export function createTimer(timeToPercentage = percentFrom) {
	return ({ startMins=10, startSecs=0 }) => {
		return (
			<svg className="timer" viewBox="-1.1 -1.1 2.2 2.2" width="400" height="400">
				<Background />
				<Slice percentLeft={timeToPercentage(startMins, startSecs)}/>
				<Foreground />
			</svg>
		);
	};
}

export function Background() {
	return <circle className="background" cx="0" cy="0" r="1" />;
}

export function Foreground() {
	return <circle className="foreground" cx="0" cy="0" r="1" />;
}

export const Slice = createSlice();

export function createSlice(circleSegment = segmentTo) {
	return ({percentLeft}) => {
		const [arcX, arcY] = circleSegment(percentLeft);
		const pathData = `M ${arcX} ${arcY} A 1 1 0 0 1 0 -1 L 0 0`;
		return <path className="slice" d={pathData} />
	};
}
