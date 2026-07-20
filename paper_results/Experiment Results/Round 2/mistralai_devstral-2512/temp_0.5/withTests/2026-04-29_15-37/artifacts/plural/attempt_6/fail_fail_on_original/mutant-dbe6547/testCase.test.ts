import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with -ics ending words', () => {
  it('should handle words ending with "ics" but not "ICS"', () => {
    expect(plural('basics')).toBe('basics');
    expect(plural('BASICS')).toBe('BASICSs');
  });
});