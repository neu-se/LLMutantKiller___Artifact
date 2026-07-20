import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsc correctly for non-zero values', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toEqual(NaN);
    expect(result.im).not.toEqual(NaN);
    expect(result.re).not.toEqual(Infinity);
    expect(result.im).not.toEqual(Infinity);
    expect(result.re).not.toEqual(-Infinity);
    expect(result.im).not.toEqual(-Infinity);
  });
});