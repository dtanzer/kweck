import React from 'react';
import { Timer, Background, Foreground, Slice, createSlice } from './Timer';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('Component <Timer/> rendering', () => {
	describe('<Timer/>', () => {
		it('renders the timer background', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Background)).toHaveLength(1);
		});
		it('renders the timer foreground', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Foreground)).toHaveLength(1);
		});
		it('renders a timer slice', () => {
			const timer = shallow(<Timer/>);
			expect(timer.find(Slice)).toHaveLength(1);
		});
	});

	describe('<Slice/>', () => {
		const circleSegment = sinon.fake.returns([12.5, 18.3]);
		const SliceComp = createSlice(circleSegment);
		const slice = shallow(<SliceComp />);

		expect(slice.find('path')).toHaveLength(1);
		expect(slice.find('path').at(0).prop('d')).toEqual('M 0 -1 A 1 1 0 0 1 12.5 18.3 L 0 0');
	});
});
