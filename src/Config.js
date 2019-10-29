import React, {useState} from 'react';

export function Config({startTimer, stopTimer}) {
	const [runningInterval, setRunningInterval] = useState(null);
	const timerCallback = () => {};
	const onStartClicked = () => {
		if(runningInterval != null) {
			stopTimer(runningInterval);
		}
		const iid = startTimer(timerCallback);
		setRunningInterval(iid);
	};

	return (
		<div>
			<a className="start-timer" href="#" onClick={onStartClicked}>Start</a>
		</div>
	);
}
