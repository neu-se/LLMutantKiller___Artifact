import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "tropic" and other words that end with similar suffixes', () => {
    expect(plural('tropic', 2)).toBe('tropics');
    expect(plural('electronic', 2)).toBe('electronics');
    expect(plural('outskirt', 2)).toBe('outskirts');
    expect(plural('odd', 2)).toBe('odds');
  });
});