import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize "woman" and "Women"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('Women')).toBe('women');
  });
});