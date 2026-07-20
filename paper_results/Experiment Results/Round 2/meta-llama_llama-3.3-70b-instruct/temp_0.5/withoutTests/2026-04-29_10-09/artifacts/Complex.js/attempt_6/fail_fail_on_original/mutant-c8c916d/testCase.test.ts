import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acsc();
    expect(result2.re).not.toBe(0);
    expect(result2.im).not.toBe(0);
  });
});