import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acotangent for b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 0), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should correctly calculate the complex acotangent for non-zero b', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.im).not.toBeCloseTo(0, 10);
  });
});