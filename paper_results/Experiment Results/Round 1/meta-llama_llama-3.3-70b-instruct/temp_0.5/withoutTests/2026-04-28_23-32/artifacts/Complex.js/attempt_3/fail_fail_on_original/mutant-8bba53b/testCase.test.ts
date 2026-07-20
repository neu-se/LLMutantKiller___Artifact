import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.cos();
    const expected = new Complex(Math.cos(1), -Math.sin(1));
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});