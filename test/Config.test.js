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
});