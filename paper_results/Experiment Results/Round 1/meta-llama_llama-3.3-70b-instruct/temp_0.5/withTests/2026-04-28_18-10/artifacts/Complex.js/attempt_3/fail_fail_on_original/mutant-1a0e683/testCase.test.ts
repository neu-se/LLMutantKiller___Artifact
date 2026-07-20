import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should return the correct result for pow function with specific input', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});