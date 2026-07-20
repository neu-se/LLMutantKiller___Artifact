import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for positive and negative values', () => {
    const c1 = new Complex(0.5, 0);
    const c2 = new Complex(-0.5, 0);
    const result1 = c1.atanh();
    const result2 = c2.atanh();
    expect(result1.re).toBeCloseTo(-result2.re);
    expect(result1.im).toBeCloseTo(result2.im);
  });
});