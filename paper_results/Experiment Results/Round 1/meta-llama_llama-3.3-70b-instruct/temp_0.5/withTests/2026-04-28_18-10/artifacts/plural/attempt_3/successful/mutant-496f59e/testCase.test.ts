import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the correct plural form for a word that matches a rule', () => {
    expect(plural('test')).toBe('tests');
    const rule = /test/i;
    const result = 'tested';
    plural.addRule(rule, result);
    expect(plural('test')).toBe('tested');
    expect(plural('test', 2)).toBe('tested');
  });
});