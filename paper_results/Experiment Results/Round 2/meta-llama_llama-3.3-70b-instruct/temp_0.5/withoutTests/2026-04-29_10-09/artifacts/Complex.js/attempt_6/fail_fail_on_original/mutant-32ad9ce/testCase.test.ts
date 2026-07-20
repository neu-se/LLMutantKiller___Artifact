import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when only one of real or imaginary parts is NaN', () => {
    expect(() => new Complex(NaN, 1)).not.toThrow();
    expect(() => new Complex(1, NaN)).not.toThrow();
  });
});