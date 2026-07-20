import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acosh()', () => {
  it('should correctly compute acosh for a complex number with specific real and imaginary parts', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.2618568896785096);
    expect(result.im).toBeCloseTo(0.48121182505960347);
  });
});