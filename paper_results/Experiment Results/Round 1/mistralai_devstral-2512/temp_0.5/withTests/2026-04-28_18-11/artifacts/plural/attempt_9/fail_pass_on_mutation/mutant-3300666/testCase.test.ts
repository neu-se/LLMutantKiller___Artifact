import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with empty rules', () => {
  it('should correctly pluralize words when rules array starts empty', () => {
    // The mutation changes rules from [] to ["Stryker was here"]
    // This test will fail on mutated code because the string in rules[0]
    // will cause the plural function to return the string instead of processing rules
    const result = plural('test');
    expect(result).toBe('tests');
  });
});