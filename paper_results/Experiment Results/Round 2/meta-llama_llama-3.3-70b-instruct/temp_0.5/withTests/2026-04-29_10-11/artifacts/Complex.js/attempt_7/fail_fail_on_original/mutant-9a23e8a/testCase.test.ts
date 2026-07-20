import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acsch function', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    const expected = Math.log(2 + Math.sqrt(2 * 2 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});