const plural = require('../index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    const result = plural('criterion');
    expect(result).toBe('criteria');
    const newRule = 'test';
    plural.addRule(newRule, 'tests');
    expect(plural(newRule)).toBe('tests');
  });
});