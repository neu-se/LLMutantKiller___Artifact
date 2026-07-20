import plural = require('./index');

describe('plural', () => {
  it('should handle pluralization of words that end with "s"', () => {
    expect(plural('kudos')).toBe('kudos');
    expect(plural('premises')).toBe('premises');
    expect(plural('shambles')).toBe('shambles');
  });
});