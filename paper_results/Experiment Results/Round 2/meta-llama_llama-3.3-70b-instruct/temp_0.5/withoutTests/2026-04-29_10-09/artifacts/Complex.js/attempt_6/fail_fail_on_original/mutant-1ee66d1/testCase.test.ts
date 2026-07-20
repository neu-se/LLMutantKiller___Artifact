import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number with a non-zero imaginary part', () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    const d = new Complex(0, -1);
    const result2 = d.acsc();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 10);
    const e = new Complex(0, 0);
    const result3 = e.acsc();
    expect(result3.re).toBeCloseTo(0, 10);
    expect(result3.im).toBeCloseTo(Math.PI / 2, 10);
  });
});