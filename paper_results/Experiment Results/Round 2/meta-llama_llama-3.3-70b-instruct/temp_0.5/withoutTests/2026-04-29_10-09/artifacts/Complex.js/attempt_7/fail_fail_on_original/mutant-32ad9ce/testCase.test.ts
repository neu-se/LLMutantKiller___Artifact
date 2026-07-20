import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when both real and imaginary parts are NaN, but not when only one is NaN', () => {
    expect(() => new Complex(NaN, NaN)).toThrow();
    expect(() => new Complex(NaN, 1)).not.toThrow();
    expect(() => new Complex(1, NaN)).not.toThrow();
  });
});