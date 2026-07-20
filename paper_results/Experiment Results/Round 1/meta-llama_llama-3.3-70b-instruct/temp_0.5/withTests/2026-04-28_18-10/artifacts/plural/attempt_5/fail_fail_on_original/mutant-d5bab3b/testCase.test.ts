import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize "woman" and "man"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
    expect(plural('Woman')).toBe('women');
    expect(plural('Man')).toBe('men');
  });
});