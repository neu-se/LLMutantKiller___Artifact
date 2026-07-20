import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b = 1 and a = 1', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot();
    const originalAcot = Math.atan2(1, 1);
    expect(acot.re).toBeCloseTo(originalAcot, 10);
    expect(acot.im).toBeCloseTo(0, 10);
  });
});