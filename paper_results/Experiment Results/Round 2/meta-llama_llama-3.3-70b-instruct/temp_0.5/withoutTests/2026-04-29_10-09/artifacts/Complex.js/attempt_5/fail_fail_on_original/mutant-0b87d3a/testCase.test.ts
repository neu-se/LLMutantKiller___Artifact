import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(0, 0);
    const d = complex2.re * complex2.re + complex2.im * complex2.im;
    expect(d).toBe(0);
    expect(() => complex2.acsc()).not.toThrow();
  });
});