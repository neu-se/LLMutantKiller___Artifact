import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle case-insensitive matching for words ending with "ics"', () => {
    expect(plural('Mathematics')).toBe('Mathematics');
    expect(plural('mathematics')).toBe('mathematics');
    expect(plural('STATISTICS')).toBe('STATISTICS');
    expect(plural('Linguistics')).toBe('Linguistics');
    expect(plural('CLASSICS')).toBe('CLASSICS');
  });
});