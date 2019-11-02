import React from 'react';
import { Config, calculateRemainingTime } from '../src/Config';

import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

describe('Config component', () => {
	describe('<Config/>', () => {
		it('calls startTimer when start was pressed', () => {
			const startTimer = sinon.stub();
			const config = shallow(<Config startTimer={startTimer} />);

			config.find('.start-timer').simulate('click');

			sinon.assert.called(startTimer);
		});
		it('renders the start button disabled when the timer is running', () => {
			const config = shallow(<Config status="running" />);

			expect(config.find('.start-timer').prop('disabled')).to.equal(true);
		});
		it('renders the start button not disabled when the timer is stopped', () => {
			const config = shallow(<Config status="stopped" />);

			expect(config.find('.start-timer').prop('disabled')).to.equal(false);
		});

		it('calls stopTimer when stop was pressed', () => {
			const stopTimer = sinon.stub();
			const config = shallow(<Config stopTimer={stopTimer} />);

			config.find('.stop-timer').simulate('click');

			sinon.assert.called(stopTimer);
		});
		it('renders the start button not disabled when the timer is running', () => {
			const config = shallow(<Config status="running" />);

			expect(config.find('.stop-timer').prop('disabled')).to.equal(false);
		});
		it('renders the start button disabled when the timer is stopped', () => {
			const config = shallow(<Config status="stopped" />);

			expect(config.find('.stop-timer').prop('disabled')).to.equal(true);
		});

		it('shows the remaining time, as passed in from the parent, when the timer is running', () => {
			const config = shallow(<Config remaining={{mins: 8, secs: 5}} status="running" />);

			expect(config.find('.remaining-mins').text()).to.equal('08');
			expect(config.find('.remaining-secs').text()).to.equal('05');
		});
		it('shows the remaining seconds without msec when the timer is running', () => {
			const config = shallow(<Config remaining={{mins: 8, secs: 3.2}} status="running" />);

			expect(config.find('.remaining-mins').text()).to.equal('08');
			expect(config.find('.remaining-secs').text()).to.equal('03');
		});
		it('does not show the remaining time when the timer is stopped', () => {
			const config = shallow(<Config remaining={{mins: 8, secs: 3.2}} status="stopped" />);

			expect(config.find('.remaining-time')).to.have.length(0);
		});

		it('passes the values of the time input to the start function when start is clicked', () => {
			const startTimer = sinon.stub();
			const config = shallow(<Config startTimer={startTimer} status="stopped" />);

			config.find('.time-input .mins').simulate('change', { target: { value: '12' } });
			config.find('.time-input .secs').simulate('change', { target: { value: '8' } });
			config.find('.start-timer').simulate('click');

			sinon.assert.calledWith(startTimer, 12, 8);
		});
		it('does not show the time input when the timer is running', () => {
			const config = shallow(<Config status="running" />);

			expect(config.find('.time-input')).to.have.length(0);
		});
	});
});
