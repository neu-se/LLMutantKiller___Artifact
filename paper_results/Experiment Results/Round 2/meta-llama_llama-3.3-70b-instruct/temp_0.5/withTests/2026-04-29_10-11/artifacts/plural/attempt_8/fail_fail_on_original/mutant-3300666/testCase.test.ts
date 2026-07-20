const plural = require('./index.js');

describe('plural function', () => {
  it('should return the correct plural form', () => {
    expect(typeof plural).toBe('function');
    expect(plural('test')).toBe('tests');
    const rules = plural.rules;
    expect(rules).toBeDefined();
    expect(Array.isArray(rules)).toBe(true);
    expect(rules.length).toBe(0);
  });
});