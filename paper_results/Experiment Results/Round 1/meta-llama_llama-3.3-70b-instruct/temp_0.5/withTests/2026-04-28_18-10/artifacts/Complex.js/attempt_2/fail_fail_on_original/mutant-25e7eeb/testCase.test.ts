import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const a = new Complex(1, 2);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(0);
  });
});