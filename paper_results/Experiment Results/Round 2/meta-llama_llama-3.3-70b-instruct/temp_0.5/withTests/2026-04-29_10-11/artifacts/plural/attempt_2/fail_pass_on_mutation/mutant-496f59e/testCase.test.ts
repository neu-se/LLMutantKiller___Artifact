import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle words with a custom rule', () => {
    plural.addRule('test', 'tests');
    expect(plural('test')).toBe('tests');
  });
});