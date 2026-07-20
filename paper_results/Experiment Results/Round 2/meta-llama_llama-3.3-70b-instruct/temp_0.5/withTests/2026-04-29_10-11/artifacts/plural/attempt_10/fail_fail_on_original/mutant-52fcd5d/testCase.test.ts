const plural = require('./index');

describe('plural', () => {
  it('should handle words that end with "tropic"', () => {
    expect(plural('tropic')).toBe('tropics');
    expect(plural('tropics')).toBe('tropics');
  });
});