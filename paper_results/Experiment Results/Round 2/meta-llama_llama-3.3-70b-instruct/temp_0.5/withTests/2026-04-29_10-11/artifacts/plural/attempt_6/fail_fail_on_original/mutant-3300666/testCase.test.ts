const plural = require('../index');

describe('plural function', () => {
  it('should return the correct plural form', () => {
    expect(typeof plural).toBe('function');
    expect(plural('test')).toBe('tests');
    const rules = plural.rules;
    expect(rules).toBeDefined();
    expect(Array.isArray(rules)).toBe(true);
    expect(rules.length).toBeGreaterThan(0);
    expect(rules[0]).toEqual(expect.arrayContaining([expect.any(Object), expect.any(Function)]));
  });
});