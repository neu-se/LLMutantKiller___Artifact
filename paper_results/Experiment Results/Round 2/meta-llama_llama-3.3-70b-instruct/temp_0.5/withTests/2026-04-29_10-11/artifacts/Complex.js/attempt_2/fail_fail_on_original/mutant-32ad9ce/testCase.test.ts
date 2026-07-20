import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, NaN);
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
  });
});