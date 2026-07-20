import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const expected = new Complex(1.3169578969248166, 0);
    expect(result.re).not.toBeCloseTo(expected.re * expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});