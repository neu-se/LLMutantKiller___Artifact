import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rules array initialization', () => {
  it('should correctly initialize rules array as empty', () => {
    // The mutation changes rules from [] to ["Stryker was here"]
    // This test will fail on mutated code because rules[0] won't be a valid rule
    const result = plural('test');
    expect(result).toBe('tests');
  });
});