import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "ICS" in uppercase followed by other characters', () => {
    expect(plural('TOPICS')).toBe('TOPICS');
    expect(plural('topics')).toBe('topics');
    expect(plural('Topics')).toBe('Topics');
  });
});