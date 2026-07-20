import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).toBeCloseTo(0, 10);
  });
});