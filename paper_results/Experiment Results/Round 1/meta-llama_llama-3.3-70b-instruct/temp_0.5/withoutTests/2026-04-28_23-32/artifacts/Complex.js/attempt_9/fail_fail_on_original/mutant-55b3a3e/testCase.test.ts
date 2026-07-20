import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a = 0 and b = 0, and check if the result is different for a non-zero and b = 0', () => {
    const complex1 = new Complex(0, 0);
    const result1 = complex1.acsc();
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acsc();
    expect(result1.re).not.toBeCloseTo(result2.re, 10);
  });
});