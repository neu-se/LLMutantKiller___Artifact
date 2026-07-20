import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct log value for positive real number', () => {
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});