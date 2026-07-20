import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).csc();
    const result = complex.csc();
    expect(result.re).not.toBeCloseTo(resultOriginal.re / Math.cos(2 * complex.re));
    expect(result.im).not.toBeCloseTo(-resultOriginal.im / Math.cos(2 * complex.re));
  });
});