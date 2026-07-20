import plural = require('./index');

describe('plural', () => {
  it('should handle empty string in misc array', () => {
    expect(plural('entrail')).toBe('entrail');
    expect(plural('')).not.toBe('s');
  });
});