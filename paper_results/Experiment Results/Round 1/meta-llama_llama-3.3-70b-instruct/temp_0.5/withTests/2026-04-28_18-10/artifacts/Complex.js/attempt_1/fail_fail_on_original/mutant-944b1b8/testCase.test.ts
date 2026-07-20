import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle division by zero correctly in the asec function', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrow(SyntaxError);
  });
});