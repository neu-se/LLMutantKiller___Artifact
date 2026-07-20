import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "tropic" when the word "tropic" is in the list of words that do not change in plural form', () => {
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('tropics', 2)).toBe('tropics');
    expect(plural('jitter', 2)).toBe('jitters');
  });
});