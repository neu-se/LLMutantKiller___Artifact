import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expected, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});