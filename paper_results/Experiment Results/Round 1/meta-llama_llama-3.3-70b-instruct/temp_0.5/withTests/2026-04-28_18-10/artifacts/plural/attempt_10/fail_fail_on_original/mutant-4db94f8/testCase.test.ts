const plural = require('./index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    const stringRule = 'criterion';
    expect(plural(stringRule)).toBe('criteria');
    expect(plural(stringRule, 1)).toBe(stringRule);
    expect(plural(stringRule, 2)).toBe('criteria');
  });
});