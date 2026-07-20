import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0);
    const complexMutated = new Complex(0.5, 0);
    const resultMutated = complexMutated.asech();
    expect(result.re).not.toEqual(resultMutated.re);
  });
});