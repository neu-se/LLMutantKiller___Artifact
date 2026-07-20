import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "ics" case-insensitively', () => {
    expect(plural('Mathematics')).toBe('Mathematics');
    expect(plural('mathematics')).toBe('mathematics');
    expect(plural('STATISTICS')).toBe('STATISTICS');
    expect(plural('Linguistics')).toBe('Linguistics');
    expect(plural('Classics')).toBe('Classics');
    expect(plural('Acoustics')).toBe('Acoustics');
  });
});