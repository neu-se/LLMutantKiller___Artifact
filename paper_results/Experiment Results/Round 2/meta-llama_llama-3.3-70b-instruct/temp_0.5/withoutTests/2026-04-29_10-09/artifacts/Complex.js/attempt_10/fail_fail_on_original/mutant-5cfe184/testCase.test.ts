import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const c = new Complex(1.1, 0);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0, 10);
    const d = new Complex(1.1, 0.1);
    const result2 = d.atanh();
    expect(result2.im).not.toBeCloseTo(0, 10);
  });
});