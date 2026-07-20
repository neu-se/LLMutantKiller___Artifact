import { Complex } from '../../../complex';

describe('Complex.js', () => {
  it('should return the correct result for atan when b is -1', () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Infinity);
  });
});