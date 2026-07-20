import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize "woman" and not pluralize "women"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('women')).toBe('women');
  });
});