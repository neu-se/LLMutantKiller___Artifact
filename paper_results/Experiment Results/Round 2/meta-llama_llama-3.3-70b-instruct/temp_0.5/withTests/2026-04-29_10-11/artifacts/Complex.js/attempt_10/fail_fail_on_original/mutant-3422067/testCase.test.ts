import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should return the correct result for hypot function when a is equal to b and a and b are large numbers', () => {
    const a = 3001;
    const b = 3001;
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});