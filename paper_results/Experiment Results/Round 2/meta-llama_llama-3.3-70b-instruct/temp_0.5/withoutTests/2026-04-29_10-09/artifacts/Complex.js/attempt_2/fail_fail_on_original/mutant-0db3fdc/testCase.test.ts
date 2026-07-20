import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.1;
    const result = Math.cos(x) - 1;
    const complex = new Complex(x);
    const expected = complex.expm1().re;
    const cosm1Result = complex.cosm1();
    expect(cosm1Result).toBeCloseTo(result, 10);
  });
});