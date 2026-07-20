import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(0.0001);
    const result = complex.cos().sub(1).re;
    expect(result).toBeCloseTo(-0.00000000005, 10);
  });
});