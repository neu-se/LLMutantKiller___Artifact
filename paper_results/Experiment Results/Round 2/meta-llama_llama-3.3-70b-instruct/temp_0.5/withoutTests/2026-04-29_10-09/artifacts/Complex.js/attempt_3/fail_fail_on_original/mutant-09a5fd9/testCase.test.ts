import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.6635121210933959, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});