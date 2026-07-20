import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const c = new Complex(2, 0);
    const originalResult = c.atanh();
    const c2 = new Complex(-2, 0);
    const result2 = c2.atanh();
    expect(originalResult.re).toBeCloseTo(result2.re);
    expect(originalResult.im).toBeCloseTo(-result2.im);
  });
});