import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.re).not.toBe(NaN);
    expect(result.im).not.toBe(NaN);
  });
});