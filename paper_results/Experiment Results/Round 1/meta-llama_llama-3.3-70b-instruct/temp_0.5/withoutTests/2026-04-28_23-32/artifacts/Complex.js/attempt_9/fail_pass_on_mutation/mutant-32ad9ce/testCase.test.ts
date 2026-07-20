import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle NaN values', () => {
    const complex = new Complex(NaN, NaN);
    expect(complex).toEqual(Complex['NAN']);
    const complex2 = new Complex(1, NaN);
    expect(complex2).not.toEqual(Complex['NAN']);
  });
});