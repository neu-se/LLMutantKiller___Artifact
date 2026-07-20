import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return Infinity when the real part is zero and the imaginary part is not zero for the acsch function in the mutated code', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});