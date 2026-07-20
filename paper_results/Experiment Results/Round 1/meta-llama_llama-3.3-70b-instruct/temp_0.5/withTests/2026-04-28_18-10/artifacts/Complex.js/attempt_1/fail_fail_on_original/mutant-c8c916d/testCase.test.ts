import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc function', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});