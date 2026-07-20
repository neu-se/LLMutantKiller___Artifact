const plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    const originalType = typeof plural;
    const stringRule = 'test';
    plural.addRule(stringRule, 'tests');
    expect(plural(stringRule)).toBe(stringRule);
    expect(plural(stringRule, 2)).toBe('tests');
    expect(typeof plural).toBe(originalType);
  });
});