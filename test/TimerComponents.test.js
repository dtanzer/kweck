import React from 'react';
import { Background, Foreground, Slice, createSlice } from '../src/TimerComponents';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('rendering of the timer', () => {
	describe('<Foreground />', () => {
		[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].forEach((mins) => {
			it('draws a line at '+mins+' minutes', () => {
				const circleSegment = (_, radius=1) => {
					if(radius === 1) {
						return [12.5, 18.3];
					}
					return [22.5, 28.3];
				};
				const slice = shallow(<Foreground circleSegment={circleSegment} />);

				expect(slice.find(`.minutes-line-${mins}`).at(0).prop('d')).to.equal('M 12.5 18.3 L 22.5 28.3');
			});
		});
	});
	describe('<Slice />', () => {
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
		it('draws the pie slice as a long arc when percentage is larger than 50', () => {
			const circleSegment = sinon.fake.returns([12.5, 18.3]);
			const SliceComp = createSlice(circleSegment);
			const slice = shallow(<SliceComp percentLeft={51.2} />);

			expect(slice.find('path')).to.have.length(1);
			expect(slice.find('path').at(0).prop('d')).to.equal('M 12.5 18.3 A 1 1 0 1 1 0 -1 L 0 0');
		});
	});
});