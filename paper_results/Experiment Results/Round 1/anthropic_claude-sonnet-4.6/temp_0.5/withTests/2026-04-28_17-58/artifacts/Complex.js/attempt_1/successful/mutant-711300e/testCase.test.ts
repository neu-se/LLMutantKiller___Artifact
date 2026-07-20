import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex parsing with object having only re property', () => {
  it('should throw SyntaxError when object has only re property but no im property', () => {
    // With original code: 'im' in a && 're' in a requires BOTH properties
    // An object with only 're' should not match the re/im branch and should throw
    // With mutated code: 'im' in a || 're' in a - having only 're' would match
    // and set im to undefined (NaN), not throw
    expect(() => {
      new Complex({ re: 3 } as any);
    }).toThrow(SyntaxError);
  });
});