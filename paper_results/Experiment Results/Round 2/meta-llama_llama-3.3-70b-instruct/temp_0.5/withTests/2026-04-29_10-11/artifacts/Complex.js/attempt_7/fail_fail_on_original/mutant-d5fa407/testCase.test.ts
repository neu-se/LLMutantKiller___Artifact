import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b = 0 and a = 1', () => {
    const complex = new Complex(1, 0);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(Math.PI / 4, 10);
    expect(acot.im).toBeCloseTo(0, 10);
  });
});