import { Complex } from "./complex.js";

describe('Complex.acosh()', () => {
  it('should correctly compute acosh for a complex number with non-zero imaginary part', () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(0.9045568943023814);
  });
});