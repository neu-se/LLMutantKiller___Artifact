import plural = require('./index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    const originalType = typeof plural;
    const stringRule = 'criterion';
    expect(plural(stringRule, 1)).toBe(stringRule);
    expect(plural(stringRule, 2)).toBe('criteria');
    expect(typeof plural).toBe(originalType);
  });
});