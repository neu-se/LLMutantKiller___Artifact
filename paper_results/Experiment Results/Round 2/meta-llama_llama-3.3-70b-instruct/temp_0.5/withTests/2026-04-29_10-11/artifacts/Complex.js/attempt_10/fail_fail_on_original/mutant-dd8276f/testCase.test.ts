import { Complex } from "../complex";

describe('Complex.js', () => {
  it('should correctly calculate acsc for complex numbers when b is not zero', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});