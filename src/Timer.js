import React, { useState, useEffect } from 'react';
import './Timer.css';
import { percentFrom } from './segment';
import { Config } from './Config';
import { Background, Foreground, Slice } from './TimerComponents';


export const Timer = createTimer(percentFrom);


export function createTimer(timeToPercentage = percentFrom, startTimer = setInterval, calcRemaining=calculateRemainingTime, currentTime = Date.now, stopTimer = clearInterval) {
	var runningInterval = null;

	return () => {
		const [runningState, setRunningState] = useState('stopped');
		const [startTime, setStartTime] = useState(0);
		const [countDownTime, setCountDownTime] = useState(10*60*1000);
		const [remainingTime, setRemainingTime] = useState(0);

		useEffect(() => {
			if(runningInterval != null) {
				stopTimer(runningInterval);
			}

			const iid = startTimer(() => {
				const elapsedTime = currentTime() - startTime;
				setRemainingTime(countDownTime - elapsedTime);
			}, 20);

			runningInterval = iid;
		}, [startTime, countDownTime]);

		const onStart = (mins, secs) => {
			const newCountDownTime = mins*60*1000 + secs*1000;
			setCountDownTime(newCountDownTime);
			setStartTime(currentTime());
			setRemainingTime(newCountDownTime);
			setRunningState('running');
		};

		const onStop = () => {
			setStartTime(0);
			setRunningState('stopped');
		};

		const calcTime = () => {
			if(runningState === 'running') {
				return calcRemaining(remainingTime);
			}
			return calcRemaining(countDownTime);
		}
		const { mins, secs } = calcTime();

		return [
				<Config key='conf' startTimer={onStart} stopTimer={onStop} status={runningState} remaining={{mins, secs}} />,

				<svg key='pie' className="timer" viewBox="-1.1 -1.1 2.2 2.2">
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
