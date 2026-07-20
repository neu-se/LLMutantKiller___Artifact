import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return correct result for acsc of (0, 0)', () => {
    const c = new Complex(0, 0);
    expect(() => c.acsc()).toThrow(SyntaxError);
  });
});