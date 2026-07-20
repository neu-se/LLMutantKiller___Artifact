import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "ICS" in mixed case', () => {
    expect(plural('iCs')).toBe('iCs');
  });
});