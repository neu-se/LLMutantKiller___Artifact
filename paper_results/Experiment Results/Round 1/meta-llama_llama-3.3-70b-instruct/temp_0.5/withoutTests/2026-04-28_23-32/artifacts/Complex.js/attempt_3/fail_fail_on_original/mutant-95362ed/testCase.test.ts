import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should not throw an error for valid input', () => {
    expect(() => new Complex('1+2i')).not.toThrowError();
  });
});