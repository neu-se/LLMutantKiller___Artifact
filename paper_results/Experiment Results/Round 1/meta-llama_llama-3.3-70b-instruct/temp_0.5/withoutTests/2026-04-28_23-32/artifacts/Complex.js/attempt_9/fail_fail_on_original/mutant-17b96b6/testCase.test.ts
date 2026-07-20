import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not zero and b is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(1);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acoth();
    expect(result2.toString()).not.toBe(result.toString());
  });
});