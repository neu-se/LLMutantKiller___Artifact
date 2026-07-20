import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate asinh correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.asinh();
    expect(result).not.toBeUndefined();
  });
});