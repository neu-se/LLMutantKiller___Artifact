import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acot correctly for b = 0 and a != 0', () => {
    const complex = new Complex(1, 0);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(Math.atan2(1, 1), 10);
    expect(acot.im).toBeCloseTo(0, 10);
  });
});