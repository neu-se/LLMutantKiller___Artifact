import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return Infinity when subtracting a finite number from Infinity', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    expect(c1.sub(c2['re'], c2['im'])).toEqual(Complex['INFINITY']);
  });
});