import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex acoth correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    const originalResult = new Complex(2, 1).acoth();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});