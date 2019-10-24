import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Config } from './Config';

import { shallow, mount, render } from 'enzyme';

describe('<App/>', () => {
	it('renders the config panel', () => {
		const app = shallow(<App />);
		expect(app.find(Config)).toHaveLength(1);
	});
});
