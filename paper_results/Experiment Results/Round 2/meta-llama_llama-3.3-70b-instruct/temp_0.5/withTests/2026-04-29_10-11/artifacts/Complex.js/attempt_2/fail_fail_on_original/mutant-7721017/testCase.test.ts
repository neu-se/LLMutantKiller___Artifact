import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the power of two complex numbers correctly', () => {
    const z1 = new Complex(0, 0);
    const z2 = new Complex(1, 0);
    const result = z1.pow(0, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});