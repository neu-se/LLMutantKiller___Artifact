import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch when the real part is not zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});