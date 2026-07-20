const plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', function() {
  it('should correctly pluralize "WoMan"', function() {
    expect(plural('WoMan')).toBe('women');
  });
});