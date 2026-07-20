import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
    expect(result.re).toBeCloseTo(0, 10);
  });
});