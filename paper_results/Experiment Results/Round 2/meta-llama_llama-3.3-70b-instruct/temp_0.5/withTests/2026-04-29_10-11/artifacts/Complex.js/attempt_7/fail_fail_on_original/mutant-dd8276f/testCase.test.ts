import { Complex } from "./complex";

describe('Complex.js', () => {
  it('should correctly calculate acsc for complex numbers when b is not zero', () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });

  it('should throw an error when b is zero in the mutated code', () => {
    const c = new Complex(0, 0);
    expect(() => c.acsc()).toThrow();
  });
});