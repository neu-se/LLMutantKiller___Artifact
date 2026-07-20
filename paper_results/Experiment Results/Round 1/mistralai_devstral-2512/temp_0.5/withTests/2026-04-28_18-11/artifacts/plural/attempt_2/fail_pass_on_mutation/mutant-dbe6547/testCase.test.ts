import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle case-insensitive matching for words ending with "ICS"', () => {
    expect(plural('ICS')).toBe('ICS');
  });
});