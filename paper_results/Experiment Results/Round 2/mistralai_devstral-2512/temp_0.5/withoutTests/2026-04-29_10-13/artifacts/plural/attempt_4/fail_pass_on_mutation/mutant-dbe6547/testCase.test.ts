import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should correctly handle words ending with "ics" case-insensitively', () => {
    expect(plural('physics', 2)).toBe('physics');
    expect(plural('Physics', 2)).toBe('Physics');
    expect(plural('PHYSICS', 2)).toBe('PHYSICS');
    expect(plural('PhYsIcS', 2)).toBe('PhYsIcS');
  });
});