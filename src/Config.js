import React, {useState} from 'react';

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
		remaining={mins: 11, secs: 7}
	}) {

	return (
		<div>
			<div>
				<span className="remaining-mins">{remaining.mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
				:
				<span className="remaining-secs">{Math.floor(remaining.secs).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
			</div>
			<a className="start-timer" href="#" onClick={startTimer}>Start</a>
		</div>
	);
}
