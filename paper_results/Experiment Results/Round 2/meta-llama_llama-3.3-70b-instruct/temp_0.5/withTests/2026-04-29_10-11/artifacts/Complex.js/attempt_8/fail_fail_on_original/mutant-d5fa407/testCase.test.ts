import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b = 0 and a = 0', () => {
    const complex = new Complex(0, 0);
    const acot = complex.acot();
    expect(acot.im).toBeCloseTo(0, 10);
  });
});