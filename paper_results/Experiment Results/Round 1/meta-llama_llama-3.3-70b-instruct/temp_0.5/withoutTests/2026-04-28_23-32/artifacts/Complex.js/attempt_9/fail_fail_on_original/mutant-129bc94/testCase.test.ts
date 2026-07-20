import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not have an empty string property', () => {
    const keys = Object.keys(Complex);
    expect(keys).not.toContain('');
  });
});