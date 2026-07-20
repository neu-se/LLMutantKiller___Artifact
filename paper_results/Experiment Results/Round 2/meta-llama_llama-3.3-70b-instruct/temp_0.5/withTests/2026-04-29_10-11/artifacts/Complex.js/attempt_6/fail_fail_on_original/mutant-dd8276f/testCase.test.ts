import { Complex } from "../complex.js";

describe('Complex.js', () => {
  it('should correctly calculate acsc for complex numbers', () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});