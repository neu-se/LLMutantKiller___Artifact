const plural = require('./index');

describe('plural', () => {
  it('should handle empty string as input for f/fe ending words', () => {
    expect(plural('')).toBe('ves');
  });
});