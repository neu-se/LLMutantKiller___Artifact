import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle words ending with "ICS" but not match "ics" in lowercase', () => {
    expect(plural('PHYSICS', 2)).toBe('PHYSICS');
    expect(plural('physics', 2)).toBe('physics');
    expect(plural('Physics', 2)).toBe('Physics');
    expect(plural('PHYSICSX', 2)).toBe('PHYSICSXes');
  });
});