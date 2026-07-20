import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle words ending with "ICS" but not "ics" in mixed case', () => {
    expect(plural('PHYSICS', 2)).toBe('PHYSICS');
    expect(plural('physicsX', 2)).toBe('physicsXs');
  });
});