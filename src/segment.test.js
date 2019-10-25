import { segmentTo, percentFrom } from './segment';

describe('segment', () => {
	describe('percentFrom', () => {
		it('returns 100% when time is 60:00', () => {
			const percentage = percentFrom(60, 0);

			expect(percentage).toEqual(100);
		});
		it('returns 10% when time is 06:00', () => {
			const percentage = percentFrom(6, 0);

			expect(percentage).toEqual(10);
		});
	});

});
