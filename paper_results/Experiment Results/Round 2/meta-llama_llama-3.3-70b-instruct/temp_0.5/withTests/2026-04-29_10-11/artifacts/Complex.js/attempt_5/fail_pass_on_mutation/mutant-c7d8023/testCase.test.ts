import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acsch when b is not zero', () => {
    const complex = new Complex(0, 0.1);
    const result = complex.acsch();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});