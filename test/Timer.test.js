import React from 'react';
import { Timer, createTimer, calculateRemainingTime } from '../src/Timer';
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
			const timeToPercentage = () => 17.34;

			const TimerComp = createTimer(timeToPercentage);
			const timer = shallow(<TimerComp/>);
			expect(timer.find(Slice).prop('percentLeft')).to.equal(17.34);
		});
		it('passes the current time left to timeToPercentage', () => {
			const timeToPercentage = sinon.fake.returns(0);

			const TimerComp = createTimer(timeToPercentage, ()=>{}, ()=>{ return {mins: 6, secs: 12.5, };});
			const timer = shallow(<TimerComp />);
			expect(timeToPercentage.calledWith(6, 12.5)).to.equal(true);
		});
		it('passes the running state to config when timer is stopped', () => {
			const timer = shallow(<Timer />);
			expect(timer.find(Config).prop('status')).to.equal('stopped');
		});
		it('passes the running state to config when timer is running', () => {
			const timer = mount(<Timer />);

			timer.find(Config).prop('startTimer')();
			timer.update();

			expect(timer.find(Config).prop('status')).to.equal('running');
		});
	});

	describe('time keeping', () => {
		const timeToPercentage = () => 0;

		it('registeres a callback for timer ticks when start is pressed', () => {
			const startTimer = sinon.stub();
			const TimerComp = createTimer(timeToPercentage, startTimer);
			
			mount(<TimerComp />);

			sinon.assert.called(startTimer);
			expect(typeof(startTimer.getCall(0).args[0])).to.equal('function');
		});

		it('uses count down time to calculate minutes and seconds when timer is stopped', () => {
			const startTimer = sinon.stub();
			const calcRemaining = sinon.stub();
			calcRemaining.returns({mins: 0, secs: 0 });
			const TimerComp = createTimer(timeToPercentage, startTimer, calcRemaining);
			
			mount(<TimerComp />);

			sinon.assert.calledWith(calcRemaining, 10*60*1000);
		});
		it('uses remaining time to calculate minutes and seconds when timer is stopped', () => {
			const startTimer = sinon.stub();
			const calcRemaining = sinon.stub();
			calcRemaining.returns({mins: 0, secs: 0 });
			const currentTime = sinon.stub();
			currentTime.onCall(0).returns(0);
			currentTime.onCall(1).returns(200);
			const TimerComp = createTimer(timeToPercentage, startTimer, calcRemaining, currentTime);
			
			const timer = mount(<TimerComp />);
			timer.find(Config).prop('startTimer')();
			timer.update();
			startTimer.getCall(0).args[0]();
			timer.update();

			sinon.assert.calledWith(calcRemaining, 10*60*1000-200);
		});
	});

	describe('calculateRemainingTime', () => {
		it('calculates the seconds correctly when minutes is 0', () => {
			const {mins, secs} = calculateRemainingTime(2100);
			expect(secs).to.be.closeTo(2.1, 0.001);
		});
		it('calculates the minutes correctly when seconds is 0', () => {
			const {mins, secs} = calculateRemainingTime(120000);
			expect(mins).to.equal(2);
		});
		it('calculates the minutes correctly when seconds is not 0', () => {
			const {mins, secs} = calculateRemainingTime(121000);
			expect(mins).to.equal(2);
		});
		it('calculates minutes and seconds correctly', () => {
			const {mins, secs} = calculateRemainingTime(121050);
			expect(mins).to.equal(2);
			expect(secs).to.be.closeTo(1.05, 0.001);
		})
	});

});
