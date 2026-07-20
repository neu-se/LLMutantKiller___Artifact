import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const c = new Complex(1.5, 0);
    const result = c.atanh();
    const d = new Complex(-1.5, 0);
    const result2 = d.atanh();
    expect(result.re).not.toBeCloseTo(result2.re, 10);
  });
});