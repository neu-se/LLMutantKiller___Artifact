import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should handle the word "sud" correctly', () => {
    expect(plural('suds')).toBe('suds');
    expect(plural('sud')).toBe('suds');
  });
});