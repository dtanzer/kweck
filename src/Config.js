import React, {useState} from 'react';
import './Config.css';

export function calculateRemainingTime(milliseconds) {
	const mins = Math.floor(milliseconds / (60*1000));
	const secs = (milliseconds - mins*60*1000) / 1000;
	return {
		mins,
		secs
	}
}

export function Config({
		startTimer=()=>{},
		stopTimer=()=>{},
		remaining={mins: 11, secs: 7},
		status,
	}) {

	const [minutes, setMinutes] = useState(10);
	const [seconds, setSeconds] = useState(0);

	const showRemainingTime = () => {
		if(status !== 'stopped') {
			return (
				<div className="remaining-time">
					<span className="remaining-mins">{remaining.mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
					&nbsp;:&nbsp;
					<span className="remaining-secs">{Math.floor(remaining.secs).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
				</div>);
		}
		return null;
	}

	const showTimeInput = () => {
		if(status === 'stopped') {
			return (
				<div className="time-input">
					<input className="mins" type="number" onChange={e => setMinutes(parseInt(e.target.value))} value={minutes} />
					&nbsp;:&nbsp;
					<input className="secs" type="number" onChange={e => setSeconds(parseInt(e.target.value))} value={seconds} />
				</div>);
		}
		return null;
	}
	return (
		<div className="config">
			{showTimeInput()}
			{showRemainingTime()}
			<button className="start-timer" onClick={() => startTimer(minutes, seconds)} disabled={status !== 'stopped'}>Start</button>
			&nbsp;
			<button className="stop-timer" onClick={stopTimer} disabled={status === 'stopped'}>Stop</button>
		</div>
	);
}
