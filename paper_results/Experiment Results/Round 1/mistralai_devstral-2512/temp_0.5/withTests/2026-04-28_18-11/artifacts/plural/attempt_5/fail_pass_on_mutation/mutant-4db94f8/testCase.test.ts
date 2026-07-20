import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is a string but rule[1] is not', () => {
    // Add a rule with a string matcher but non-function/string result
    plural.addRule('test', 123);
    expect(plural('test')).toBe(123);
  });
});