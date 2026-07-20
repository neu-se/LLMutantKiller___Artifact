import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const complex2 = new Complex(1, 0);
    const d = complex2.re * complex2.re + complex2.im * complex2.im;
    expect(d).toBe(1);
    const result2 = complex2.acsc();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    expect(() => new Complex(0, 0).acsc()).toThrowError();
  });
});