import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not have an empty property', () => {
    const complex = new Complex(1, 2);
    const result = complex.atanh();
    expect(Object.keys(result)).not.toContain('');
  });
});