import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for acot when a is not zero and b is not zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.5 * Math.log(2), 10);
    expect(result.im).toBeCloseTo(-0.25 * Math.PI, 10);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});