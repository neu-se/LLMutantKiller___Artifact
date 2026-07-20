import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    const originalResult = new Complex(Math.log((1 + Math.sqrt(1 - 0.5 * 0.5)) / 0.5), 0);
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});