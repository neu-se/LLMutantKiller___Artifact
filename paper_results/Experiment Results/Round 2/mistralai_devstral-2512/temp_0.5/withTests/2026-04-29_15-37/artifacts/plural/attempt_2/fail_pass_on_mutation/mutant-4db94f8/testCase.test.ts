import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string-based rules', () => {
  it('should correctly handle string-based rules by checking type', () => {
    // This test specifically targets the mutation by adding a string rule
    // that would only work if the type check is present
    plural.addRule('testword', 'testwords');
    expect(plural('testword')).toBe('testwords');
  });
});