import React from 'react';
import { Timer, createTimer } from '../src/Timer';
import { Background, Foreground, Slice } from '../src/TimerComponents';
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
});
