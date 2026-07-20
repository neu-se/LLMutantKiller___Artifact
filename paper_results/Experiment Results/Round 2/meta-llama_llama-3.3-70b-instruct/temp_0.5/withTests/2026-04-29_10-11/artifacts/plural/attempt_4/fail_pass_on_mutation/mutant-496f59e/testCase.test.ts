import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly handle words with a custom regex rule', () => {
    plural.addRule(/test/i, function(w) { return w + 's'; });
    expect(plural('test')).toBe('tests');
  });
});