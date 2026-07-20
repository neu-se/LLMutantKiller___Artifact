import plural = require('./index');

describe('plural', () => {
  it('should handle pluralization of words that end with "s"', () => {
    expect(plural('electronic')).toBe('electronics');
  });
});