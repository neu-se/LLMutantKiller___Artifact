import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.1;
    const result = Math.cos(x) - 1;
    const complexResult = new Complex(x).expm1();
    expect(Math.abs(result - complexResult.re) < 1e-9).toBe(true);
  });
});