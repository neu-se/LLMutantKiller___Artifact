import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number and not have an empty string key', () => {
    const complex = new Complex('1+2i');
    expect(Object.prototype.hasOwnProperty.call(complex, '')).toBe(false);
  });
});