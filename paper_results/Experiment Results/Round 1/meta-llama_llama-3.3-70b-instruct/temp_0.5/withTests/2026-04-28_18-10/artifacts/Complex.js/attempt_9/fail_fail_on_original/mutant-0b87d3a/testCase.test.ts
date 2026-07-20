import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acsc function when d is zero', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(1, 0);
    expect(complex2.acsc().re).toBeNaN();
    const complex3 = new Complex(1, 1);
    expect(complex3.acsc().re).not.toBeNaN();
    expect(complex3.acsc().im).not.toBeNaN();
    expect(complex3.acsc().re).not.toEqual(complex3.acsc().im);
  });
});