import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for positive and negative values', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(-2, 0);
    const result1 = c1.atanh();
    const result2 = c2.atanh();
    expect(result1.im).not.toBeCloseTo(result2.im);
  });
});