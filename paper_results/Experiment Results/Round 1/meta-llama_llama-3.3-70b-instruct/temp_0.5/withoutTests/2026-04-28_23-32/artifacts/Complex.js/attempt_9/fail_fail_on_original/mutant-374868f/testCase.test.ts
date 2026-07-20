import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.asech();
    const expected = new Complex(0.48121182505960347, 0);
    expect(result.re).toBeCloseTo(expected.re, 6);
    expect(result.im).toBeCloseTo(expected.im, 6);
    expect(result.re * result.re).not.toBeCloseTo(result.re, 6);
  });
});