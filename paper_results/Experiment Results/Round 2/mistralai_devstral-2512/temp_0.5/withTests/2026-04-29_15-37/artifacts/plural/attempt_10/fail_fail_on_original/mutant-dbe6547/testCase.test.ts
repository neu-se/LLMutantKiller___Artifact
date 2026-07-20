import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "ICS" but not match partial matches', () => {
    expect(plural('BASICS')).toBe('BASICS');
    expect(plural('basicsX')).toBe('basicsXs');
  });
});