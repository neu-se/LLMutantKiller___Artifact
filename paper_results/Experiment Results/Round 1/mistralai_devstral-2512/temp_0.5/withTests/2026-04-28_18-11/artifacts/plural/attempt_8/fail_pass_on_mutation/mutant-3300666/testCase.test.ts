import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rules array initialization', () => {
  it('should start with empty rules array', () => {
    // The mutation changes rules from [] to ["Stryker was here"]
    // This test will fail on mutated code because the first rule will be a string
    // instead of a valid rule array, causing the plural function to behave incorrectly
    const result = plural('test');
    expect(result).toBe('tests');
  });
});