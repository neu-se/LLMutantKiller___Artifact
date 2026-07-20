import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(2 * 2 + 1)), 5);
  });
});