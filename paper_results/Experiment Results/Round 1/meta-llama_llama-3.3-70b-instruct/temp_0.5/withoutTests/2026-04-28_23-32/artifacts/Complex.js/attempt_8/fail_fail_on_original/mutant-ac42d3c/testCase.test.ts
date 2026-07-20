import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with real part 0 and imaginary part -Infinity when calculating atan for b = -1', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result.im).toBeLessThan(0);
  });
});