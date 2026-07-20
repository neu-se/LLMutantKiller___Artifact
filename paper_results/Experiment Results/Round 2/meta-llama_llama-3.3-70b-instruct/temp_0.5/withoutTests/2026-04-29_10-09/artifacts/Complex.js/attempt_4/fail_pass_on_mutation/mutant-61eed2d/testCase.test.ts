import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and have an "im" property directly on the object', () => {
    const complex = new Complex('1+2i');
    expect(complex.hasOwnProperty('im')).toBe(true);
  });
});