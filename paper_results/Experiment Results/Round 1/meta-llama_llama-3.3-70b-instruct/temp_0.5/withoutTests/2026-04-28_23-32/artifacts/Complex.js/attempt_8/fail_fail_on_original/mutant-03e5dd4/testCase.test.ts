import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when parsing a complex number with a space after the plus sign', () => {
    expect(() => new Complex('3 +4i')).not.toThrow(SyntaxError);
  });
});