import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.5493061443340549);
    expect(result.im).toBeCloseTo(-0.7059487739463177);
  });
});