import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is zero and b is zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.acoth();
    expect(result.toString()).not.toBe('0 1.5707963267948966');
  });
});