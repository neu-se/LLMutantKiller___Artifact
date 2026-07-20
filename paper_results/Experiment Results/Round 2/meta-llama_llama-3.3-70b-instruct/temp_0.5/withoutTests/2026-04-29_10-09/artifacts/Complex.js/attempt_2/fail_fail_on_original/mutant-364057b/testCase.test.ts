import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});