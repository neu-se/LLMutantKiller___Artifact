import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not 0', () => {
    const complex = new Complex(1, 0);
    expect(complex.acoth().toString()).not.toBe('0 NaN');
  });
});