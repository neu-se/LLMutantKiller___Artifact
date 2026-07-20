import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex.js', () => {
  it('should calculate the complex atanh correctly', () => {
    const complex = new Complex(1.5, 0.5);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.46364760900080615);
    expect(result.im).toBeCloseTo(-0.3665129205816643);
  });
});