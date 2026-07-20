import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a complex number with a real part of 1 and an imaginary part of 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(0, 5);
    const complex2 = new Complex(0, 0);
    expect(complex2.asech().re).toBe(Infinity);
    expect(complex2.asech().im).toBe(0);
    const complex3 = new Complex(0.5, 0);
    expect(complex3.asech().re).not.toBeNaN();
    expect(complex3.asech().im).not.toBeNaN();
  });
});