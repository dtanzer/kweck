import React from 'react';
import { Background, Foreground, Slice, createSlice } from '../src/TimerComponents';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('<Slice/>', () => {
	it('draws the pie slice with data from circleSegment', () => {
		const circleSegment = sinon.fake.returns([12.5, 18.3]);
		const SliceComp = createSlice(circleSegment);
		const slice = shallow(<SliceComp />);

		expect(slice.find('path')).to.have.length(1);
		expect(slice.find('path').at(0).prop('d')).to.equal('M 12.5 18.3 A 1 1 0 0 1 0 -1 L 0 0');
	});
	it('passes the current percentage to circleSegment', () => {
		const circleSegment = sinon.fake.returns([0, 0]);
		const SliceComp = createSlice(circleSegment);
		const slice = shallow(<SliceComp percentLeft={34.2} />);

		expect(circleSegment.calledWith(34.2)).to.equal(true);
	});
});
