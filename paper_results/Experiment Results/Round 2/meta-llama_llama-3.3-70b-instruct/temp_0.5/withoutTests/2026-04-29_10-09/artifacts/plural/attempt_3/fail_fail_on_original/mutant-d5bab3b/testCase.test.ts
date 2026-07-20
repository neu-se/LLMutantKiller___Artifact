import plural = require('./index.js');

describe('plural', () => {
  it('should correctly pluralize "woman"', () => {
    expect(plural('woman')).toBe('women');
    expect(plural('man')).toBe('men');
    expect(plural('Man')).toBe('Men'); // The mutated code will return 'Man' instead of 'Men'
  });
});