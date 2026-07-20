import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle pow correctly for 0^x when x > 0 and x is positive', () => {
    const c = new Complex(0, 0);
    const z = new Complex(0.5, 0);
    const result = c.pow(z);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});