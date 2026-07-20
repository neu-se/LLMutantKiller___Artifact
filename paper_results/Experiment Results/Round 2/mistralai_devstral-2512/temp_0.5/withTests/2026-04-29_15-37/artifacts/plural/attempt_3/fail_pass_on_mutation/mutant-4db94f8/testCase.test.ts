import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string-based rules', () => {
  it('should correctly handle string-based rules when a number is passed', () => {
    // This test targets the mutation by using a string rule with a number parameter
    // The mutation changes the type check from 'String' to 'true', which affects behavior
    plural.addRule('box', 'boxes');
    expect(plural('box', 1)).toBe('box');
    expect(plural('box', 2)).toBe('boxes');
  });
});