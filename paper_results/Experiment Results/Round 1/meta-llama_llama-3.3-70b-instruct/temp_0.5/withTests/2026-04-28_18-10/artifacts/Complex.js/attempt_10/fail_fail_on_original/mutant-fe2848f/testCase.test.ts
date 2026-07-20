import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for atanh function', () => {
    const complex = new Complex(1.1, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
  });
});