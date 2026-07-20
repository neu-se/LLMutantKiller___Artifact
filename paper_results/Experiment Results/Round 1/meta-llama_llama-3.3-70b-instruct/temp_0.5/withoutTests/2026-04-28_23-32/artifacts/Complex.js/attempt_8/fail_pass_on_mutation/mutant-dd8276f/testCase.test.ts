import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex1 = new Complex(0, 1);
    const complex2 = new Complex(0, 0);
    const result1 = complex1.acsc();
    const result2 = complex2.acsc();
    expect(result1.re).not.toBeCloseTo(result2.re, 10);
  });
});