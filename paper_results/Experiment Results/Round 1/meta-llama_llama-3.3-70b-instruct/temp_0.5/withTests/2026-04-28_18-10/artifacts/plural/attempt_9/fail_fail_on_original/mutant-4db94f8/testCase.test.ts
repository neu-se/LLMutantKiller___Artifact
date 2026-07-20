const plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    expect(plural('cactus', 1)).toBe('cactus');
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('man', 1)).toBe('man');
    expect(plural('man', 2)).toBe('men');
    expect(plural('woman', 1)).toBe('woman');
    expect(plural('woman', 2)).toBe('women');
    const stringRule = 'test';
    plural.addRule(stringRule, 'tests');
    expect(plural(stringRule, 1)).toBe(stringRule);
    expect(plural(stringRule, 2)).toBe('tests');
  });
});