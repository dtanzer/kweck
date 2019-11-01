import React from 'react';
import './Timer.css';
import { percentFrom, segmentTo } from './segment';
import { Config } from './Config';
import { Background, Foreground, Slice } from './TimerComponents';


export const Timer = createTimer();

export function createTimer(timeToPercentage = percentFrom) {
	return ({ startMins=10, startSecs=0 }) => {
		return [
			<Config />,

			<svg className="timer" viewBox="-1.1 -1.1 2.2 2.2" width="400" height="400">
				<Background />
				<Slice percentLeft={timeToPercentage(startMins, startSecs)}/>
				<Foreground />
			</svg>
		];
	};
}
