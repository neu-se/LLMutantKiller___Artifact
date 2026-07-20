import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle atanh correctly for a = -0.5', () => {
    const c = new Complex(-0.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(-0.5493061443340548);
    const c2 = new Complex(-1, 0);
    const result2 = c2.atanh();
    expect(result2.re).toBeCloseTo(-Infinity);
    expect(c.atanh().re).not.toBeCloseTo(c2.atanh().re);
  });
});