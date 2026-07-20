import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with specific suffixes', () => {
    expect(plural('electronic')).toBe('electronics');
    expect(plural('sud')).toBe('suds');
    expect(plural('entrail')).toBe('entrails');
    expect(plural('')).toBe('s'); // This test should fail on the mutated code
  });
});