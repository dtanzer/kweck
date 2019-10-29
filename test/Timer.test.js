import React from 'react';
import { Timer, Background, Foreground, Slice, createSlice, createTimer } from '../src/Timer';
import { Config } from '../src/Config';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('Component <Timer/> rendering', () => {
	describe('<Timer/>', () => {
		it('renders the config panel', () => {
			const timer = shallow(<Timer />);
			expect(timer.find(Config)).to.have.length(1);
		});
		it('renders the timer background', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Background)).to.have.length(1);
		});
		it('renders the timer foreground', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Foreground)).to.have.length(1);
		});
		it('renders a timer slice', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Slice)).to.have.length(1);
		});
		it('passes percentLeft to slice when timer is not running', () => {
			const timeToPercentage = sinon.fake.returns(17.34);

			const TimerComp = createTimer(timeToPercentage);
			const timer = shallow(<TimerComp/>);
			expect(timer.find(Slice).prop('percentLeft')).to.equal(17.34);
		});
		it('passes the current time left to timeToPercentage', () => {
			const timeToPercentage = sinon.fake.returns(0);

			const TimerComp = createTimer(timeToPercentage);
			const timer = shallow(<TimerComp startMins={6} startSecs={12.5} />);
			expect(timeToPercentage.calledWith(6, 12.5)).to.equal(true);
		});
	});

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
});
