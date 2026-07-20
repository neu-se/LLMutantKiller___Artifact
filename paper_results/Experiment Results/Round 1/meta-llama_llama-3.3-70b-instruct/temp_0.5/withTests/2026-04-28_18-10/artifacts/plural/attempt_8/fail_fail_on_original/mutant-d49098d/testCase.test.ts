const plural = require('./index');

describe('plural', () => {
  it('should handle empty string in misc array', () => {
    expect(plural('electronic')).toBe('electronic');
    expect(plural('')).toBe('');
  });
});