import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate asec for a complex number with non-zero real part', () => {
    const complex = new Complex(1, 0);
    expect(complex.asec()).toEqual(new Complex(0, Infinity));
  });
});