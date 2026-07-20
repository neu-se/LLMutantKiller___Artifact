import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    const expectedRe = 0.5493061443340548;
    const expectedIm = -0.46364760900080615;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});