import { plural } = require('./index.js');

describe('plural', () => {
  it('should correctly pluralize "man"', () => {
    expect(plural('man')).toBe('men');
    expect(plural('Man')).toBe('Men');
    expect(plural('woman')).toBe('women');
    expect(plural(' Woman')).toBe(' Women'); 
    expect(plural('man')).not.toBe('man'); 
    expect(plural('woMan')).toBe('women'); // The mutated code will return 'woMen' instead of 'women'
  });
});