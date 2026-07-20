import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with im equal to -Infinity when b is -1 in atan', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result.im).toBe(-Infinity);
  });
});