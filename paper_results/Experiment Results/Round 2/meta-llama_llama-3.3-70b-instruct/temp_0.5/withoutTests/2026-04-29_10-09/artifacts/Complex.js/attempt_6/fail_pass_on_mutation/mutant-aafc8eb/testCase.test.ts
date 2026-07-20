import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a small real value', () => {
    const complex = new Complex(1e-16);
    const result = complex.expm1();
    const expected = Math.expm1(1e-16);
    expect(result.re).toBeCloseTo(expected, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});