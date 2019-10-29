import React from 'react';
import { Config } from '../src/Config';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('<Config/>', () => {
	it('registeres a callback for timer ticks when start is pressed', () => {
		const startTimer = sinon.stub();
		const config = shallow(<Config startTimer={startTimer} />);

		config.find('.start-timer').simulate('click');

		sinon.assert.called(startTimer);
		expect(typeof(startTimer.getCall(0).args[0])).to.equal('function');
	});

	it('first stops a running timer before starting a new timer when start is pressed', () => {
		const startTimer = sinon.fake.returns(17);
		const stopTimer = sinon.stub();
		const config = shallow(<Config startTimer={startTimer} stopTimer={stopTimer} />);

		config.find('.start-timer').simulate('click');
		config.find('.start-timer').simulate('click');

		sinon.assert.called(stopTimer);
		expect(stopTimer.getCall(0).args[0]).to.equal(17);
	});

	it('shows the remaining time, calculated by a helper function, after pressing start', () => {
		const startTimer = sinon.stub();
		const calcRemaining = () => { return { mins: 11, secs: 7 }; };
		const config = shallow(<Config startTimer={startTimer} calcRemaining={calcRemaining} />);

		config.find('.start-timer').simulate('click');

		expect(config.find('.remaining-mins').text()).to.equal('11');
		expect(config.find('.remaining-secs').text()).to.equal('07');
	});

	it('passes the remaining milliseconds to the helper function', () => {
		const startTimer = sinon.stub();
		const calcRemaining = sinon.fake.returns({ mins: 11, secs: 7 });
		const config = shallow(<Config startTimer={startTimer} calcRemaining={calcRemaining} />);

		config.find('.start-timer').simulate('click');

		sinon.assert.calledWith(calcRemaining, 10*60*1000);
	});

	it('passes the elapsed time to the timer helper function on after a tick', () => {
		const startTimer = sinon.stub();
		const delta = 60;
		const currentTime = sinon.fake.returns(delta);
		const calcRemaining = sinon.fake.returns({ mins: 11, secs: 7 });
		const config = mount(<Config startTimer={startTimer} calcRemaining={calcRemaining} currentTime={currentTime} />);

		config.find('.start-timer').simulate('click');
		const timerCallback = startTimer.getCall(0).args[0];
		timerCallback();

		sinon.assert.calledWith(calcRemaining, 10*60*1000-delta);
	});
});