import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.acsc().re).not.toBe(complex.acsc().im);
  });
});