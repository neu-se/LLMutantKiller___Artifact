import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const expected = new Complex((0.5 !== 0) ? 0.5 / 0 : 0, (0 !== 0) ? -0 / 0 : 0).acosh();
    expect(result.re).not.toBeCloseTo(expected.re, 10);
    expect(result.im).not.toBeCloseTo(expected.im, 10);
  });
});