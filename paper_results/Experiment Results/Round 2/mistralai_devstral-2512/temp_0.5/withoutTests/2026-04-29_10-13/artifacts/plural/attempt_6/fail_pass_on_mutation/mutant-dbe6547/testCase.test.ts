import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should handle words ending with "ics" case-insensitively', () => {
    expect(plural('physics', 2)).toBe('physics');
    expect(plural('Physics', 2)).toBe('Physics');
    expect(plural('PHYSICS', 2)).toBe('PHYSICS');
    expect(plural('PhYsIcS', 2)).toBe('PhYsIcS');
    expect(plural('economics', 2)).toBe('economics');
    expect(plural('ECONOMICS', 2)).toBe('ECONOMICS');
  });
});