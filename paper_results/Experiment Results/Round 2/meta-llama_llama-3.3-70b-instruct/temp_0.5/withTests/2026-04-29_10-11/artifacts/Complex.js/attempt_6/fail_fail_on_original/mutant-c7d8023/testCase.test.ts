import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error or return correct result for acsch when b is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});