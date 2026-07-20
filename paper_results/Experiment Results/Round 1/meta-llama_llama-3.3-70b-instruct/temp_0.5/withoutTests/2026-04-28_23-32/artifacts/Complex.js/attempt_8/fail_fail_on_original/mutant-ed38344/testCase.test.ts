import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle subtraction of two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    expect(c1.sub(c2)).toEqual(Complex['INFINITY']);
    const c3 = new Complex(1, 1);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.sub(c4)).toEqual(Complex['INFINITY']);
    const c5 = new Complex(Infinity, Infinity);
    const c6 = new Complex(Infinity, Infinity);
    expect(c5.sub(c6)).not.toEqual(Complex['INFINITY']);
  });
});