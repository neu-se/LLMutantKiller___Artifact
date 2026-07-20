import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for atan when the input is i', () => {
    const c = new Complex(0, 1);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Infinity);
  });
});