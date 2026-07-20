import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});