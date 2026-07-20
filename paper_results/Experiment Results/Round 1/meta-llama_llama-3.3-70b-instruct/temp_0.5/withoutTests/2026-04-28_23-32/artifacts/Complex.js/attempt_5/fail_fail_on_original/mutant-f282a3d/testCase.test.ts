import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing complex numbers with empty string suffix in the original code but not in the mutated code', () => {
    expect(() => new Complex('1+')).toThrow(SyntaxError);
  });
});