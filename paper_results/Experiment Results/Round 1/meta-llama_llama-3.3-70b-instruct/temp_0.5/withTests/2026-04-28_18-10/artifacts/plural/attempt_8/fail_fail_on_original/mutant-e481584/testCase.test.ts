const plural = require('./index.js');

describe('plural function', () => {
  it('should return "cellos" for the word "cello"', () => {
    expect(plural('cello')).not.toBe('');
    expect(plural('cello')).not.toBe('cello');
    expect(plural('cello')).toHaveLength(6);
  });
});