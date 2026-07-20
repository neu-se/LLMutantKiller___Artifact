import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle pow correctly for 0^x when x > 0 and x is positive', () => {
    const c = new Complex(0, 0);
    const z = new Complex(0.5, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });

  it('should handle pow correctly for 0^x when x is a small positive number and greater than or equal to zero', () => {
    const c = new Complex(0, 0);
    const z = new Complex(0, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});