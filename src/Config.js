import React, {useState} from 'react';

export function calculateRemainingTime(milliseconds) {
	const mins = Math.floor(milliseconds / (60*1000));
	const secs = (milliseconds - mins*60*1000) / 1000;
	return {
		mins,
		secs
	}
}

export function Config({startTimer = setInterval, 
		stopTimer = clearInterval, 
		calcRemaining=calculateRemainingTime,
		currentTime=Date.now,
		setRemainingTime=()=>{},

		setRunningStatus=()=>{},
		remaining={mins: 11, secs: 7}
	}) {
	const [runningInterval, setRunningInterval] = useState(null);
	const [countDownFrom, setCountDownFrom] = useState(10*60*1000);
	const [time, setTime] = useState(0);
	const [startTime, setStartTime] = useState(0);
	
	const timerCallback = () => {
		setTime(currentTime());
	};
	const onStartClicked = () => {
		setRunningStatus('running');

		//old code, most of this should be moved to parent.
		if(runningInterval != null) {
			stopTimer(runningInterval);
		}
		setStartTime(currentTime());
		setTime(currentTime);
		const iid = startTimer(timerCallback, 20);
		setRunningInterval(iid);
	};

	const { mins, secs } = calcRemaining(countDownFrom - (time - startTime));
	setRemainingTime(mins, secs);
	//{mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
	//{Math.floor(secs).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
	return (
		<div>
			<div>
				<span className="remaining-mins">{remaining.mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
				:
				<span className="remaining-secs">{Math.floor(remaining.secs).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
			</div>
			<a className="start-timer" href="#" onClick={onStartClicked}>Start</a>
		</div>
	);
}
