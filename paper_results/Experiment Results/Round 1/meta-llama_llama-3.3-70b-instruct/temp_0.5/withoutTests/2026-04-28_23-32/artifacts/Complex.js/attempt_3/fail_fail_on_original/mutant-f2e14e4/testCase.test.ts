import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0.46364760900080615);
    expect(result.im).toBeCloseTo(-0.7853981633974483);
  });
});