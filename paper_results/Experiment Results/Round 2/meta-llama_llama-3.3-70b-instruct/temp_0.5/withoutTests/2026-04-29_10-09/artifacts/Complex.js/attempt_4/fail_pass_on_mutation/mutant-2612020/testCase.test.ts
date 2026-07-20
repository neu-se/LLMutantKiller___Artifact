import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should not have an empty string property', () => {
    const complex = new Complex('1+2i');
    expect(complex).not.toHaveProperty('');
  });
});