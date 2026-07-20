import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct log value for zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(-Infinity);
    const complex2 = new Complex(0, 0);
    expect(complex.log().re).toBeCloseTo(complex2.log().re);
    const complex3 = new Complex(1e-16, 0);
    expect(complex.log().re).not.toBeCloseTo(complex3.log().re);
  });
});