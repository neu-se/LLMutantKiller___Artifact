import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acoth();
    expect(result.toString()).not.toBe('0 NaN');
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});