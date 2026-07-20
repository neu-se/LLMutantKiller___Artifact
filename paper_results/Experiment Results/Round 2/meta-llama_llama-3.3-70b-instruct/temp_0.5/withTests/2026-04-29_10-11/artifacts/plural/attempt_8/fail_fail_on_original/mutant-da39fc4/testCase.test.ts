import plural = require('./index');

describe('plural library', () => {
  it('should correctly pluralize "wolf"', () => {
    expect(plural('wolf')).toBe('wolves');
  });
});