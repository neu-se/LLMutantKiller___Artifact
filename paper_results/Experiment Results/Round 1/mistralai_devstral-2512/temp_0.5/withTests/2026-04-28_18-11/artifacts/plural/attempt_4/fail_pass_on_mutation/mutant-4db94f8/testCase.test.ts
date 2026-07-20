import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string rules', () => {
  it('should correctly handle string rule matching when rule[0] is an object', () => {
    // Add a rule with an object as the matcher (which should not match)
    const obj = { toString: () => 'test' };
    plural.addRule(obj, 'matched');
    expect(plural('test')).toBe('tests');
  });
});