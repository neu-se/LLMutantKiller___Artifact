import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle pow correctly for 0^x when x > 0', () => {
    const c = new Complex(0, 0);
    const z = new Complex(0.5, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });

  it('should handle pow correctly for 0^x when x is a small positive number', () => {
    const c = new Complex(0, 0);
    const z = new Complex(1e-10, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});