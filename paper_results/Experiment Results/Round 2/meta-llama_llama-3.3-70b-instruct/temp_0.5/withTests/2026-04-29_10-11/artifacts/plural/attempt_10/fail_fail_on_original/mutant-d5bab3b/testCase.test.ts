const plural = require('./index.js');

describe('plural', function() {
  it('should correctly pluralize "woman" and "WoMan"', function() {
    expect(plural('woman')).toBe('women');
    expect(plural('WoMan')).toBe('women');
  });
});