export function percentFrom(mins, secs) {
	const seconds = mins*60+secs;
	const secondsInHour = 3600;

	return (seconds / secondsInHour) * 100;
}

export function segmentTo() {
	return [0, -1];
}
