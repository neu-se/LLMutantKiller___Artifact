import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and have an "im" property', () => {
    const complex = new Complex('1+2i');
    expect(Object.keys(complex)).toContain('im');
  });
});