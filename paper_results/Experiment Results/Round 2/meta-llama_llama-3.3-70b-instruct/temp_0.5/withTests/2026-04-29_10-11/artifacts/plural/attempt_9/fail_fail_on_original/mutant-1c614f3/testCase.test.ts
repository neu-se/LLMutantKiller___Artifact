const plural = require('./index');

describe('plural', () => {
  it('should correctly handle the plural form of a word with a custom rule', () => {
    const result = plural('cactus');
    expect(result).toBe('cacti');
    plural.addRule('cactus', 'cactuses');
    const result2 = plural('cactus');
    expect(result2).toBe('cactuses');
  });
});