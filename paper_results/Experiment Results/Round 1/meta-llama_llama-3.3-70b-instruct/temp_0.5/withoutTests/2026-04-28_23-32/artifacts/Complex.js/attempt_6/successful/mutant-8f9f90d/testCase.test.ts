import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly and not have an empty string property', () => {
    const complex = new Complex(1.5, 0.5);
    const result = complex.atanh();
    expect(Object.keys(result)).not.toContain('');
  });
});