import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a and b are 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acoth();
    expect(result.toString()).toBe('0 π/2');
  });
});