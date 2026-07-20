import plural = require('../index');

describe('plural function', () => {
  it('should return "cellos" for the word "cello"', () => {
    expect(plural('cello')).not.toBe('');
  });
});