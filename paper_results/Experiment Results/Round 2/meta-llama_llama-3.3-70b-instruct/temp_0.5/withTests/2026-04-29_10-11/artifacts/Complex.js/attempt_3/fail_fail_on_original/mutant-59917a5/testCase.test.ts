import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh with a > 1 and b === 0', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity, 0);
    expect(result.im).toBeCloseTo(0, 0);
  });
});