import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when subtracting Infinity from Infinity', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2['re'], c2['im'])).toEqual(Complex['NAN']);
  });
});