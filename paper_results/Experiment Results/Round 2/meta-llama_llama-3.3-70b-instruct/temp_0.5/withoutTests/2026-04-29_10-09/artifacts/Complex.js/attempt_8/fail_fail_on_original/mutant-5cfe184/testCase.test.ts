import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const d = new Complex(-2, 0);
    const result2 = d.atanh();
    expect(result2.re).toBeCloseTo(-0.5493061443340548, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});