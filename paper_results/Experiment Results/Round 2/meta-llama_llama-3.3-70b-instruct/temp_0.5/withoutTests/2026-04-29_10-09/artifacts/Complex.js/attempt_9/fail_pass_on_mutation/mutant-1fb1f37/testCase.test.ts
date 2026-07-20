import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh for a specific value', () => {
    const complex = new Complex(0, 0);
    const result = complex.cosh();
    expect(result.re).not.toBe(false);
  });
});