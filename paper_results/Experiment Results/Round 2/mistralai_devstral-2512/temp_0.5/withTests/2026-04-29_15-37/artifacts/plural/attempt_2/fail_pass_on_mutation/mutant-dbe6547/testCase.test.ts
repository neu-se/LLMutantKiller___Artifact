import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "ICS" in uppercase', () => {
    expect(plural('PHYSICS')).toBe('PHYSICS');
  });
});