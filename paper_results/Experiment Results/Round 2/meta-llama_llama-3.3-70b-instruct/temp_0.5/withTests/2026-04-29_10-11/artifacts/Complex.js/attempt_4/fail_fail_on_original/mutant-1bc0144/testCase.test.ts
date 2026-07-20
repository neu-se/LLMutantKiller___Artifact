import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});