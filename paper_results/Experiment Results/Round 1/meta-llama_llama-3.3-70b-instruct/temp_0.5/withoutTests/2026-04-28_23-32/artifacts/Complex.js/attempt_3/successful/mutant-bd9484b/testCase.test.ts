import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acosh for a specific input', () => {
    const complex = new Complex(-1, 0);
    const acosh = complex.acosh();
    expect(acosh.re).toBeCloseTo(0, 6);
    expect(acosh.im).toBeCloseTo(Math.PI, 6);
  });
});