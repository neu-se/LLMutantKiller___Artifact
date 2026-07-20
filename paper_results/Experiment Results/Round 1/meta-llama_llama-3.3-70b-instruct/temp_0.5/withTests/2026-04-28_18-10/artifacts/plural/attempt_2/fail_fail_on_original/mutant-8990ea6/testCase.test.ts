import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize words that end with "quy"', () => {
    expect(plural('quy')).toBe('quies');
    expect(plural('quy', 1)).toBe('quy');
  });
});