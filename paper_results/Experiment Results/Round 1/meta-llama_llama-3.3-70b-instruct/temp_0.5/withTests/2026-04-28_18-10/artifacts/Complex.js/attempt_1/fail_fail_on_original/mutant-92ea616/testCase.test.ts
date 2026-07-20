import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acot when d is not zero', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.46364760900080615);
    expect(result.im).toBeCloseTo(-0.46364760900080615);
  });
});