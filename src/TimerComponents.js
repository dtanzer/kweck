import React from 'react';
import { segmentTo } from './segment';

export function Background() {
	return <circle className="background" cx="0" cy="0" r="1" />;
}

export function Foreground() {
	return <circle className="foreground" cx="0" cy="0" r="1" />;
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
