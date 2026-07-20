import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(0.01);
    const expm1 = complex.expm1();
    const expected = Math.exp(0.01) - 1;
    expect(Math.abs(expm1.re - expected)).toBeLessThan(1e-10);
    expect(Math.abs(expm1.im)).toBeLessThan(1e-10);
  });
});