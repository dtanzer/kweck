export function percentFrom(mins, secs) {
	const seconds = mins*60+secs;
	const secondsInHour = 3600;

	return (seconds / secondsInHour) * 100;
}

export function segmentTo(percentage) {
	const angle = 2*Math.PI*percentage/100;
	return [-Math.sin(angle), -Math.cos(angle)];
}
