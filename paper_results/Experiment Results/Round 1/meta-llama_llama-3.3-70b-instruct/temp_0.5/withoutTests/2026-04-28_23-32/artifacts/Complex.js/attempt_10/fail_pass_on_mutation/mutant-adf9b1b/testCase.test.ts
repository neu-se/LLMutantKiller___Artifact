import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for a complex input that triggers the Taylor series expansion in cosm1', () => {
    const complex = new Complex(0.000001);
    const result = complex.expm1();
    const expected = complex.exp().sub(1);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});