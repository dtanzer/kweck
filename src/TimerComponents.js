import React from 'react';
import { segmentTo } from './segment';

export function Background() {
	return <circle className="background" cx="0" cy="0" r="1" />;
}

export function Foreground({circleSegment = segmentTo}) {
	const minutesLines = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(mins => {
		const percent = 100*mins/60;
		const [startX, startY] = circleSegment(percent, 1);
		const [endX, endY] = circleSegment(percent, 0.95);
		return <path key={mins} className={`minutes-line-${mins} foreground`} d={`M ${startX} ${startY} L ${endX} ${endY}`} />
	});
	return (
		<g>
			{minutesLines}
			<circle className="foreground" cx="0" cy="0" r="1" />
		</g>
	);
}

export const Slice = createSlice();

export function createSlice(circleSegment = segmentTo) {
	return ({percentLeft}) => {
		const [arcX, arcY] = circleSegment(percentLeft);
		const largeArc = percentLeft>50? 1 : 0;
		const pathData = `M ${arcX} ${arcY} A 1 1 0 ${largeArc} 1 0 -1 L 0 0`;
		return <path className="slice" d={pathData} />
	};
}
