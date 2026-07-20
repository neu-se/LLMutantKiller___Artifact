import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly pluralize words with exact string matches', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
  });
});