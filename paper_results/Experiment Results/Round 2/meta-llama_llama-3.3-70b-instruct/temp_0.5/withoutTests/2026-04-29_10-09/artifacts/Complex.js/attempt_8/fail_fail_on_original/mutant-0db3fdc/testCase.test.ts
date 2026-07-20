import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for small values', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = Math.cos(x) - 1;
    const complexResult = complex.cosm1();
    expect(complexResult).toBeCloseTo(result, 10);
  });
});