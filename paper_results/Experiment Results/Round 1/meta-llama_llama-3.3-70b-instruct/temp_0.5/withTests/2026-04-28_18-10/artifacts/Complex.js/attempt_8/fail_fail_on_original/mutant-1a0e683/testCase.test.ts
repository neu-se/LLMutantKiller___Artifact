import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should return the correct result for pow function with specific input', () => {
    const z = new Complex(1, 0);
    const result = new Complex(0, 0).pow(z);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});