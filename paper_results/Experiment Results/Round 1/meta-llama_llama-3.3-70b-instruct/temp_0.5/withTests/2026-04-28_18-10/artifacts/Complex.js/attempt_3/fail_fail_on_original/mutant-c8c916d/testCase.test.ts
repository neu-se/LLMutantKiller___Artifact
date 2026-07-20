import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc function', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.toString()).toBe('0 -1.5707963267948966i');
  });
});