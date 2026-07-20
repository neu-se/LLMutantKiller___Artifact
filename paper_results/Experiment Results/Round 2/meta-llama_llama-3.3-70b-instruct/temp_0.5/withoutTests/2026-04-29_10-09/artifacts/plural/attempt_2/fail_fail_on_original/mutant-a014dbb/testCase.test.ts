import plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural function', () => {
  it('should correctly pluralize "roof"', () => {
    expect(plural('roof', 2)).toBe('roofs');
  });
});