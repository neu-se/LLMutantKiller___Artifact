import plural = require('./index');

describe('plural', () => {
  it('should correctly handle the plural form of a word with a custom rule', () => {
    plural.addRule('cactus', function(w) { return w + 'i'; });
    expect(plural('cactus')).toBe('cacti');
    plural.addRule('cactus', 'cactuses');
    expect(plural('cactus')).toBe('cactuses');
  });
});