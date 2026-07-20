import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for words in the misc list', () => {
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('jitter', 2)).toBe('jitters');
    expect(plural('spectacle', 2)).toBe('spectacles');
    expect(plural('tropic', 1)).toBe('tropic');
    expect(plural('tropics', 1)).toBe('tropics');
  });
});