import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(1, -1);
    const result2 = complex2.acosh();
    expect(result2.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result2.im).toBeCloseTo(-0.9045568943023819, 10);
  });
});