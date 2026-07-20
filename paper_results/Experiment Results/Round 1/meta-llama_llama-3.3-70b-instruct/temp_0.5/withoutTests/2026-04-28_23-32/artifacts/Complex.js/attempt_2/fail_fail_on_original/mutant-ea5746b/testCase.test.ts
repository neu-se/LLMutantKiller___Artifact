import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.01;
    const cosm1Original = (Math.cos(x) - 1);
    const cosm1FromComplex = Complex.cosm1(x);
    expect(Math.abs(cosm1Original - cosm1FromComplex) < 1e-9).toBe(true);
  });
});