import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.cos().sub(1);
    const expected = new Complex(-0.0000000000000001118, 0);
    expect(result.re).toBeCloseTo(expected.re, 15);
    expect(result.im).toBeCloseTo(expected.im, 15);
  });
});