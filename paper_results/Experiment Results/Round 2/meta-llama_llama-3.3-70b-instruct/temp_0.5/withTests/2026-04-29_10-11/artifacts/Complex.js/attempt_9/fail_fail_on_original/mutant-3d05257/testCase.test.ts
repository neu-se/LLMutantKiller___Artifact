import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943062487);
  });
});