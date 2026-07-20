import plural = require('./index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    expect(plural('criterion', 1)).toBe('criterion');
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
  });
});