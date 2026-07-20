import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly handle subtraction of two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    expect(c1.sub(c2)).toEqual(Complex['INFINITY']);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.sub(c4)).toEqual(Complex['NAN']);
  });
});