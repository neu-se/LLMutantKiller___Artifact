const plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should correctly handle the plural form of a word with a custom rule', () => {
    plural.addRule('test', (w: string) => w + 's');
    expect(plural('test')).toBe('tests');
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
  });
});