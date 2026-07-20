import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).toBeCloseTo(-0.48121182505960347);
    expect(result.im).toBeCloseTo(2.3044918531755095);
    expect(complex['re']).not.toBe(complex['']);
  });
});