const plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize "roof"', () => {
    expect(plural('roof')).toBe('roofs');
  });
});