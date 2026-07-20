import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acsch', () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    const expected = new Complex(0.4811945734682642, 0.89681021452633);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});