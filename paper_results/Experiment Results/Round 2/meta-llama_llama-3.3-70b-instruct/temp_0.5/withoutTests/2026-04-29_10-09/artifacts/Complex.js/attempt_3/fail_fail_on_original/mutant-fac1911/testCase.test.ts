import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite result for the acsch function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});