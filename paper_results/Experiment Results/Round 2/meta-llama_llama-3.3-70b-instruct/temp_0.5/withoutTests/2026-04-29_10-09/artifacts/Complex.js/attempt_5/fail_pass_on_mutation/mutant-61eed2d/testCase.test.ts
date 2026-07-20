import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and have an "im" property with the correct value', () => {
    const complex = new Complex('1+2i');
    expect(complex.im).toBe(2);
    expect(Object.getOwnPropertyNames(complex)).toContain('im');
  });
});