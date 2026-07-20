import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should correctly handle the plural form of a word with a custom rule', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
  });
});