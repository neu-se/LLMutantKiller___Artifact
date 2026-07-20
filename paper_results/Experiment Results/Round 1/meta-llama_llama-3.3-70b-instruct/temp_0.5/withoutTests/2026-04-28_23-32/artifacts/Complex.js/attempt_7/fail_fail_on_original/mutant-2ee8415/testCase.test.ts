import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should initialize complex number correctly', () => {
    const complex = new Complex(2, 3);
    expect(complex.constructor.prototype.hasOwnProperty('re')).toBe(true);
  });
});