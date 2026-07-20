const plural = require('./index.js');

describe('plural', () => {
  it('should correctly pluralize "woman"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
    expect(plural('woMan')).toBe('women'); // The mutated code will return 'woMen' instead of 'women'
  });
});