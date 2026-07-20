import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(1);
    const expm1 = complex.expm1();
    expect(expm1.re).toBeCloseTo(Math.exp(1) - 1, 10);
    expect(expm1.im).toBeCloseTo(0, 10);
  });
});