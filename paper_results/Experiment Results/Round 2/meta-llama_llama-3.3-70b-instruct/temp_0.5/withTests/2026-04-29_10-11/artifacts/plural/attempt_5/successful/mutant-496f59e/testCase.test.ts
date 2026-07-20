import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle words with a regex rule and non-function result', () => {
    plural.addRule(/test/i, 'tests');
    expect(plural('test')).toBe('tests');
    plural.addRule(/test/i, function(w) { return w + 's'; });
    expect(plural('test')).toBe('tests');
  });
});