import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle subtraction of two complex numbers where one is infinite and the other is not', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2)).toEqual(Complex['INFINITY']);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(1, 1);
    expect(c3.sub(c4)).toEqual(Complex['INFINITY']);
    const c5 = new Complex(1, 1);
    const c6 = new Complex(1, 1);
    expect(c5.sub(c6)).toEqual(new Complex(0, 0));
  });
});