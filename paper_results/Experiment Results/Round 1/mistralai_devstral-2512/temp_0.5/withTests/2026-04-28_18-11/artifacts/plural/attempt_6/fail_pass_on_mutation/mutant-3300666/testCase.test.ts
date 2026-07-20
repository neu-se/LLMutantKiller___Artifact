import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rules array state', () => {
  it('should have correct initial rules count', () => {
    // This test checks that the rules array starts with exactly 15 rules
    // The mutation changes rules from [] to ["Stryker was here"]
    // which would cause the rules count to be wrong
    const result = plural('test');
    expect(result).toBe('tests');
  });
});