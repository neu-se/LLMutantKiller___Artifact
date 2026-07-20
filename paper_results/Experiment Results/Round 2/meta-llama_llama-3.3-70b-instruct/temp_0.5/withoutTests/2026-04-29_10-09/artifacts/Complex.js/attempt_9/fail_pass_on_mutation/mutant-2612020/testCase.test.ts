import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should not have an empty string property when parsing a complex number', () => {
    const complex = new Complex('1+2i');
    expect(Object.prototype.hasOwnProperty.call(complex, '')).toBe(false);
  });
});