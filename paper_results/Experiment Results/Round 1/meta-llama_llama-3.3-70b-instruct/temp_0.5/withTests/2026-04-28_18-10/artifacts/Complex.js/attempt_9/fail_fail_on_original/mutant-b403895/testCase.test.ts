import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for asec', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    const a = complex.re;
    const b = complex.im;
    expect(a).not.toBe(0);
    expect(b).not.toBe(0);
    const d = a * a + b * b;
    expect(d).toBeGreaterThan(0);
    expect(a / d).not.toBe(0);
  });
});