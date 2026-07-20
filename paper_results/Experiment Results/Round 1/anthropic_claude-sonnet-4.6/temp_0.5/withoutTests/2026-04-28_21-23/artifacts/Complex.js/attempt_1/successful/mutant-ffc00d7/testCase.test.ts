import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex string parsing validation', () => {
  it('should throw SyntaxError when i appears without a preceding sign after a number', () => {
    // After parsing '2', plus and minus are reset to 0
    // Then 'i' is encountered, and plus+minus===0 should trigger parser_exit()
    // In the mutated code, if(false) skips this check, so no error is thrown
    expect(() => {
      new Complex('2ii');
    }).toThrow(SyntaxError);
  });
});