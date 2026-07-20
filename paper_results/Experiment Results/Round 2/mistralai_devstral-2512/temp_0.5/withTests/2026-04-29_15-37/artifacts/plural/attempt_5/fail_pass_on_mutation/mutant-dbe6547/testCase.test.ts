import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "ICS" followed by other characters', () => {
    expect(plural('TOPICS')).toBe('TOPICS');
  });
});