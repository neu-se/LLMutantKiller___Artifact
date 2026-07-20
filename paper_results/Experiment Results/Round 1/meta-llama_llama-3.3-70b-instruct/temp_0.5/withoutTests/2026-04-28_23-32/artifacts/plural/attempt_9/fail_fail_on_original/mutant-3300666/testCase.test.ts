import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('returns the correct plural form of a word', () => {
    const result = plural('Stryker was here', 2);
    expect(result).not.toBe('Stryker was heres');
  });
});