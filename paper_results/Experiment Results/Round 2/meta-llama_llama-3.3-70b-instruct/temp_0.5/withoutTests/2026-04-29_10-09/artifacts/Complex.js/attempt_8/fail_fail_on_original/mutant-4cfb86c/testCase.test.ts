import { Complex } from "../complex";

describe('Complex', () => {
  it('should return the correct acot value for a complex number', () => {
    const complex = new Complex(1, 0);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(0, 10);
    expect(acot.im).toBeCloseTo(0, 10);
  });
});