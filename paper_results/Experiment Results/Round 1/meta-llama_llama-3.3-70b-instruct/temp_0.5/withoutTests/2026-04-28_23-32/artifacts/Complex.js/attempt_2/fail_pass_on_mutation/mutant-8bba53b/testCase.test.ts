import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(1) * Math.cos(1) + Math.cos(1) - 1, Math.exp(1) * Math.sin(1));
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});