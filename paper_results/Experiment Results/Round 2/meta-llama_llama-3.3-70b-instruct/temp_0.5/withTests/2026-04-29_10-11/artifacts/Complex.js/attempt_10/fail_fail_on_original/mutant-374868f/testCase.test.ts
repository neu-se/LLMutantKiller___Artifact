import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const asech = complex.asech();
    const acosh = new Complex(asech.re, asech.im).acosh();
    expect(acosh.re).toBeCloseTo(0.5);
    expect(acosh.im).toBeCloseTo(0);
  });
});