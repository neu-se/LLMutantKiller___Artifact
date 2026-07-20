import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle mixed case words ending with "iCs"', () => {
    expect(plural('EconomiCs')).toBe('EconomiCs');
  });
});