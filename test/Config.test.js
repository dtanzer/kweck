import React from 'react';
import { Config, calculateRemainingTime } from '../src/Config';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('Config component', () => {
	describe('<Config/>', () => {
		//The new config should just report the remaining time and the running status back to the parent...
		it('passes the initial mins and secs back to the parent via a callback immediately', () => {
			const startTimer = sinon.stub();
			const setRemainingTime = sinon.stub();

			const config = shallow(<Config startTimer={startTimer} setRemainingTime={setRemainingTime} />);

			sinon.assert.calledWith(setRemainingTime, 10, 0);
		});

		it('calls setRunningStatus when start was pressed', () => {
			const startTimer = sinon.stub();
			const setRunningStatus = sinon.stub();
			const config = shallow(<Config startTimer={startTimer} setRemainingTime={()=>{}} setRunningStatus={setRunningStatus} />);

			config.find('.start-timer').simulate('click');

			sinon.assert.calledWith(setRunningStatus, 'running');
		});

		it('shows the remaining time, as passed in from the parent, when the timer is running', () => {
			const startTimer = sinon.stub();
			const setRemainingTime = sinon.stub();

			const config = shallow(<Config startTimer={startTimer} setRemainingTime={setRemainingTime} remaining={{mins: 8, secs: 5}} status="running" />);

			expect(config.find('.remaining-mins').text()).to.equal('08');
			expect(config.find('.remaining-secs').text()).to.equal('05');
		});

		it('shows the remaining seconds without msec when the timer is running', () => {
			const startTimer = sinon.stub();
			const setRemainingTime = sinon.stub();

			const config = shallow(<Config startTimer={startTimer} setRemainingTime={setRemainingTime} remaining={{mins: 8, secs: 3.2}} status="running" />);

			expect(config.find('.remaining-mins').text()).to.equal('08');
			expect(config.find('.remaining-secs').text()).to.equal('03');
		});

		//I want to move the whole timer logic one component up, so those tests will soon be
		//in the wrong place. I'll keep them for now to keep things green.
		it('registeres a callback for timer ticks when start is pressed', () => {
			const startTimer = sinon.stub();
			const config = shallow(<Config startTimer={startTimer} setRemainingTime={()=>{}} />);

			config.find('.start-timer').simulate('click');

			sinon.assert.called(startTimer);
			expect(typeof(startTimer.getCall(0).args[0])).to.equal('function');
		});

		it('first stops a running timer before starting a new timer when start is pressed', () => {
			const startTimer = sinon.fake.returns(17);
			const stopTimer = sinon.stub();
			const config = shallow(<Config startTimer={startTimer} stopTimer={stopTimer} setRemainingTime={()=>{}} />);

			config.find('.start-timer').simulate('click');
			config.find('.start-timer').simulate('click');

			sinon.assert.called(stopTimer);
			expect(stopTimer.getCall(0).args[0]).to.equal(17);
		});

		it('passes the remaining milliseconds to the helper function', () => {
			const startTimer = sinon.stub();
			const calcRemaining = sinon.fake.returns({ mins: 11, secs: 7 });
			const config = shallow(<Config startTimer={startTimer} calcRemaining={calcRemaining} setRemainingTime={()=>{}} />);

			config.find('.start-timer').simulate('click');

			sinon.assert.calledWith(calcRemaining, 10*60*1000);
		});

		it('passes the elapsed time to the timer helper function on after a tick', () => {
			const startTimer = sinon.stub();
			const delta = 60;
			const currentTime = sinon.stub()
			
			currentTime.onCall(0).returns(0);
			currentTime.onCall(1).returns(0);
			currentTime.onCall(2).returns(delta);
			
			const calcRemaining = sinon.fake.returns({ mins: 11, secs: 7 });
			const config = mount(<Config startTimer={startTimer} calcRemaining={calcRemaining} currentTime={currentTime} setRemainingTime={()=>{}} />);

			config.find('.start-timer').simulate('click');
			const timerCallback = startTimer.getCall(0).args[0];
			timerCallback();

			sinon.assert.calledWith(calcRemaining, 10*60*1000-delta);
		});

		it('passes the remaining time to the parent component via a callback', () => {
			const startTimer = sinon.stub();
			const setRemainingTime = sinon.stub()
			const calcRemaining = () => { return { mins: 11, secs: 7 }; };
			const config = shallow(<Config startTimer={startTimer} calcRemaining={calcRemaining} setRemainingTime={setRemainingTime}/>);

			config.find('.start-timer').simulate('click');

			sinon.assert.calledWith(setRemainingTime, 11, 7);
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
