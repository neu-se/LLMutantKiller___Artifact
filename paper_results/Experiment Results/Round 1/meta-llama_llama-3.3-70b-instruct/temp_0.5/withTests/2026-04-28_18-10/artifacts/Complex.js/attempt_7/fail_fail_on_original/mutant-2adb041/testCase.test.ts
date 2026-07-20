import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for small values', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expectedReal = Math.expm1(x) * Math.cos(x) + Math.cos(x) - 1;
    expect(Math.abs(result.re - expectedReal) < 1e-9).toBe(true);
    expect(result.im).toBeCloseTo(0);
  });
});