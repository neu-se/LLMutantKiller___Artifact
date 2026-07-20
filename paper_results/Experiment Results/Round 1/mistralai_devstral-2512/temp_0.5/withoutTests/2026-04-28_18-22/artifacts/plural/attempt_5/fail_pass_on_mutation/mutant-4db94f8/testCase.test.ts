import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should fail when string rule type check is mutated', () => {
    // This test specifically targets the mutation by adding a string rule
    // that would only work with the original type check
    plural.addRule('testword', 'testwords');
    expect(plural('testword', 2)).toBe('testwords');
  });
});