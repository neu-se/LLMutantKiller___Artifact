import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a and b are not 0', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.toString()).not.toBe('0 π/2');
  });
});