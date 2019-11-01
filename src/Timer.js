import React, { useState, useEffect } from 'react';
import './Timer.css';
import { percentFrom, segmentTo } from './segment';
import { Config } from './Config';
import { Background, Foreground, Slice } from './TimerComponents';


export const Timer = createTimer(percentFrom, () => {});


export function createTimer(timeToPercentage = percentFrom, startTimer = setInterval, calcRemaining=calculateRemainingTime, currentTime=Date.now) {
	return ({ startMins=10, startSecs=0 }) => {
		const [runningState, setRunningState] = useState('stopped');
		const [startTime, setStartTime] = useState(0);
		const [countDownTime, setCountDownTime] = useState(10*60*1000);
		const [remainingTime, setRemainingTime] = useState(0);

		useEffect(() => {
			startTimer(() => {
				const elapsedTime = currentTime() - startTime;
				setRemainingTime(countDownTime - elapsedTime);
			}, 20);
		}, [startTime, countDownTime]);

		const onStart = () => {
			setStartTime(currentTime());
			setRunningState('running');
		};

		const calcTime = () => {
			if(runningState === 'running') {
				return calcRemaining(remainingTime);
			}
			return calcRemaining(countDownTime);
		}
		const { mins, secs } = calcTime();

		return [
			<Config startTimer={onStart} status={runningState} remaining={{mins, secs}} />,

			<svg className="timer" viewBox="-1.1 -1.1 2.2 2.2" width="400" height="400">
				<Background />
				<Slice percentLeft={timeToPercentage(mins, secs)}/>
				<Foreground />
			</svg>
		];
	};
}

export function calculateRemainingTime(milliseconds) {
	const mins = Math.floor(milliseconds / (60*1000));
	const secs = (milliseconds - mins*60*1000) / 1000;
	return {
		mins,
		secs
	}
}
