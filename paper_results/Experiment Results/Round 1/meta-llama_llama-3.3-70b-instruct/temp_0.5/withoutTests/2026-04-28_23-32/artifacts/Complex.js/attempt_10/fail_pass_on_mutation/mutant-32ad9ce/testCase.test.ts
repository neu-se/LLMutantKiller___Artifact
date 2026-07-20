import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle NaN values', () => {
    const complex1 = new Complex(NaN, 1);
    const complex2 = new Complex(1, NaN);
    expect(complex1).not.toEqual(complex2);
  });
});