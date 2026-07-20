import plural = require('./index.js');

describe('plural function', () => {
  it('should not return an empty string for the word "cello"', () => {
    expect(plural('cello')).not.toBe('');
  });
});