import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1', () => {
    const x = 0.1;
    const expected = Math.cos(x) - 1;
    const actual = (x * x * (x * x * (x * x * (x * x * (x * x / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2;
    expect(actual).toBeCloseTo(expected, 10);
  });
});