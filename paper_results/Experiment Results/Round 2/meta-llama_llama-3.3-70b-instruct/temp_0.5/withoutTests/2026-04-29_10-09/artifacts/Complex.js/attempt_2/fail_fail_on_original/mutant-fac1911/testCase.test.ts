import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for the acsch function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.2231435513, 5);
    expect(result.im).toBeCloseTo(-0.862684967, 5);
  });
});