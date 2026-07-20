import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a specific case', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(isFinite(result.re)).toBe(false);
    expect(isFinite(result.im)).toBe(false);
  });
});