const plural = require('./index');

describe('plural function', () => {
  it('should return the singular form when the input number is 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});