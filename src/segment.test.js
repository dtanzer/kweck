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

	describe('segmentTo', () => {
		it('returns the topmost point of the circle for 0%', () => {
			const [x, y] = segmentTo(0);

			expect(x).toBeCloseTo(0);
			expect(y).toBeCloseTo(-1);
		});
		it('returns the bottommost point of the circle for 50%', () => {
			const [x, y] = segmentTo(50);

			expect(x).toBeCloseTo(0);
			expect(y).toBeCloseTo(1);
		});
		it('returns the leftmmost point of the circle for 25%', () => {
			const [x, y] = segmentTo(25);

			expect(x).toBeCloseTo(-1);
			expect(y).toBeCloseTo(0);
		});
	});
});
