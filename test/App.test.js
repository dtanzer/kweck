import React, { useState } from 'react';
import { App } from '../src/App';
import { Config } from '../src/Config';
import { Timer } from '../src/Timer';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('<App/>', () => {
	it('renders the config panel', () => {
		const app = shallow(<App />);
		expect(app.find(Config)).to.have.length(1);
	});
	it('renders the timer panel', () => {
		const app = shallow(<App />);
		expect(app.find(Timer)).to.have.length(1);
	});
	it('passes remaining time to the timer', () => {
		const app = shallow(<App />);
		expect(app.find(Timer).prop('time')).to.deep.equal({ mins: 10, secs: 0 });
	});
});
