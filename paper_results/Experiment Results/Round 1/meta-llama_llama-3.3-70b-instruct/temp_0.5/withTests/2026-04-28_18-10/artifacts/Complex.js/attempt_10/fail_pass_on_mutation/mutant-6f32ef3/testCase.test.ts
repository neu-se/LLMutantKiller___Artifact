import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct string representation of a complex number', () => {
    const complex = new Complex(1, 0);
    const str = complex.toString();
    expect(str.indexOf('+')).toBe(-1);
    expect(str.indexOf('-')).toBe(-1);
  });
});