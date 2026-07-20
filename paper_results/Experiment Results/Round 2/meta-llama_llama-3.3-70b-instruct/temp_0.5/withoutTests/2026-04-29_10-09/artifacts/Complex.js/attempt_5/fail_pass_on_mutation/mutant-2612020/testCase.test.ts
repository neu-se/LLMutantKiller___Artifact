import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should have the correct value for the "re" property when parsing a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(Object.keys(complex)).not.toContain('');
  });
});