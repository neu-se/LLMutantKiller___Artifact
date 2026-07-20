import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not return NaN for asec when called with 0, 0 on the original code but return NaN on the mutated code', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});