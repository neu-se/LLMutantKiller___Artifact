import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', function() {
  it('should correctly pluralize "woman"', function() {
    expect(plural('woman')).toBe('women');
    expect(plural('WoMan')).toBe('women');
    expect(plural('WOMAN')).toBe('women');
  });
});