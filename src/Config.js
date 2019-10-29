import React, {useState} from 'react';

function calculateRemainingTime() {
	return {
		mins: 10,
		secs: 0
	}
}

export function Config({startTimer = setInterval, 
		stopTimer = clearInterval, 
		calcRemaining=calculateRemainingTime,
		currentTime=Date.now,
	}) {
	const [runningInterval, setRunningInterval] = useState(null);
	const [countDownFrom, setCountDownFrom] = useState(10*60*1000);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [startTime, setStartTime] = useState(0);

	const timerCallback = () => {
		setElapsedTime(currentTime() - startTime);
	};
	const onStartClicked = () => {
		if(runningInterval != null) {
			stopTimer(runningInterval);
		}
		setElapsedTime(0);
		setStartTime(currentTime());
		const iid = startTimer(timerCallback, 20);
		setRunningInterval(iid);
	};

	const { mins, secs } = calcRemaining(countDownFrom - elapsedTime);
	return (
		<div>
			<div>
				<span className="remaining-mins">{mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
				:
				<span className="remaining-secs">{secs.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
			</div>
			<a className="start-timer" href="#" onClick={onStartClicked}>Start</a>
		</div>
	);
}
