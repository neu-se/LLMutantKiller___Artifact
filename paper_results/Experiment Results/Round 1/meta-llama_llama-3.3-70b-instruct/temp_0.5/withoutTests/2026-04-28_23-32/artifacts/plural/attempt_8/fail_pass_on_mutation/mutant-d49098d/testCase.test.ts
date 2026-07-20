import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should handle the word "electronic" and "sud" correctly', () => {
    expect(plural('electronic')).toBe('electronics');
    expect(plural('sud')).toBe('suds');
    expect(plural('suds')).toBe('suds');
  });
});