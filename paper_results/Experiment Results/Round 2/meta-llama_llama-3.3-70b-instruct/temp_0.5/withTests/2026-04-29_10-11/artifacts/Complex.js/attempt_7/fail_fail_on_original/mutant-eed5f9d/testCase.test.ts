import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should test the acsch method with a non-zero real part', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).not.toBe(0);
  });
});