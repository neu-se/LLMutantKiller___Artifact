import plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural', () => {
  it('should correctly pluralize "woman"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('Woman')).toBe('Women');
  });
});