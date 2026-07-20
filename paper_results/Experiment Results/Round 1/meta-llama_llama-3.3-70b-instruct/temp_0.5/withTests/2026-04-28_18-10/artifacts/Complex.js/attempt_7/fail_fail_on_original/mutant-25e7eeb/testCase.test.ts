import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const c = new Complex(1, 2);
    const d = new Complex(3, 0);
    const result = c.mul(d);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(2);
  });
});