import plural = require('./../index.js');

describe('plural function', () => {
  it('should return a non-empty string for the word "cello"', () => {
    const result = plural('cello');
    expect(result).not.toBe('');
    expect(result).not.toBe('cello');
  });
});