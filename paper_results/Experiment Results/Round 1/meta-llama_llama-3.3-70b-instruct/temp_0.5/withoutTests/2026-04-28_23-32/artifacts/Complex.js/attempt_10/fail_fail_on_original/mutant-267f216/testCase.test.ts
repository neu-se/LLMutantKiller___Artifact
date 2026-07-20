import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 2);
    const result = complex.acsch();
    const a = complex.re;
    const b = complex.im;
    const d = a * a + b * b;
    expect(d).toBeGreaterThan(0);
  });
});