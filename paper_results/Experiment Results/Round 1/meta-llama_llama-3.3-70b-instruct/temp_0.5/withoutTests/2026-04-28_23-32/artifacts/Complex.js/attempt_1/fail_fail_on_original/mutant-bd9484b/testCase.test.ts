import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acosh', () => {
    const complex = new Complex(Math.sqrt(2), 0);
    const acosh = complex.acosh();
    expect(acosh.re).toBeCloseTo(0.881374, 6);
    expect(acosh.im).toBeCloseTo(0, 6);
  });
});