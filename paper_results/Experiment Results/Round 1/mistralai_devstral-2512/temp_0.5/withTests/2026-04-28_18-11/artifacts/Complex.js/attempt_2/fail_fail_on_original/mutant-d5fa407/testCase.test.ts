import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot method', () => {
  it('should handle the case when both real and imaginary parts are zero', () => {
    const c = new Complex(0, 0);
    const result = c.acot();
    // The original code should return a Complex number with real part 0 and imaginary part Math.PI/2
    // The mutated code will incorrectly return a different value due to the hardcoded 'false'
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});