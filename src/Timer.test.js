import React from 'react';
import { Timer, Background, Foreground } from './Timer';

import { shallow, mount, render } from 'enzyme';

describe('<Timer/>', () => {
	it('renders the timer background', () => {
		const timer = shallow(<Timer/>);
		expect(timer.find(Background)).toHaveLength(1);
	});
	it('renders the timer foreground', () => {
		const timer = shallow(<Timer/>);
		expect(timer.find(Foreground)).toHaveLength(1);
	});
});
