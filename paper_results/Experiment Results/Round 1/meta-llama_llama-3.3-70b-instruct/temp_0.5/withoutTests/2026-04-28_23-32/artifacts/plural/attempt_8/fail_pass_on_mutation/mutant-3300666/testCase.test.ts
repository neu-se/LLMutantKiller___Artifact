import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    expect(plural('Stryker was here', 1)).toBe('Stryker was here');
  });
});