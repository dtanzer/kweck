import React from 'react';
import { App } from './App';
import { Config } from './Config';
import { Timer } from './Timer';

import { shallow, mount, render } from 'enzyme';

describe('<App/>', () => {
	it('renders the config panel', () => {
		const app = shallow(<App />);
		expect(app.find(Config)).toHaveLength(1);
	});
	it('renders the timer panel', () => {
		const app = shallow(<App />);
		expect(app.find(Timer)).toHaveLength(1);
	});
});
