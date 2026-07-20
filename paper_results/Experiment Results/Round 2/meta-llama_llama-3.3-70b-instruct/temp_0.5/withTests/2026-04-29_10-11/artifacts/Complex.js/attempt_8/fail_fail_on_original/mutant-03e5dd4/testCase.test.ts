import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a complex number with a space', () => {
    const originalCode = new Complex('1+2i');
    expect(originalCode.re).toBe(1);
    expect(originalCode.im).toBe(2);

    // The mutation changes the condition to check for an empty string instead of a space, tab, or newline
    // So, this test should pass on the original code and fail on the mutated code
    expect(() => new Complex('1 +2i')).toThrowError(SyntaxError);
  });
});