import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = new Complex(-0.5 * x * x, 0);
    expect(result.re).toBeCloseTo(expected.re, 15);
    expect(result.im).toBeCloseTo(expected.im, 15);
  });
});