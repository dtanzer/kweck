import React from 'react';
import { Config } from '../src/Config';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('<Config/>', () => {
	it('calls the startTimer function when the start button was clicked', () => {
		const startTimer = sinon.spy();
		const config = shallow(<Config startTimer={startTimer} />);

		config.find('.start-timer').simulate('click');

		sinon.assert.called(startTimer);
	});
});