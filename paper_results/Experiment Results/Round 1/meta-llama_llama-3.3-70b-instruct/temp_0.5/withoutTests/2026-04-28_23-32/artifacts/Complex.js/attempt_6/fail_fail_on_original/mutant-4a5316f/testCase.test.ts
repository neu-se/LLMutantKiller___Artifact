import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex acoth correctly for a specific case', () => {
    const complex = new Complex(1, 0);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(1, -1);
    const result2 = complex2.acoth();
    expect(result2.im).not.toBeCloseTo(result.im, 10);
  });
});