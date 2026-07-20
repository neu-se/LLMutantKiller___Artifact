import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when asech is called with a non-zero real part', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(-Infinity);
  });
});