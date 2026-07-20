import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with "electronic" suffix', () => {
    expect(plural('electronic')).toBe('electronics');
    expect(plural('sud')).toBe('suds');
    expect(plural('entrail')).toBe('entrails');
  });
});