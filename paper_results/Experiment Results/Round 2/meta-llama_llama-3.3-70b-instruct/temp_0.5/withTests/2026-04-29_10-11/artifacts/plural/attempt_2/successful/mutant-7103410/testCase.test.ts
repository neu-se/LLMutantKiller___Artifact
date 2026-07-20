import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should return the correct plural form when using the monkey patched String.prototype.plural function', () => {
    plural.monkeyPatch();
    expect('test'.plural(2)).toBe('tests');
    plural.unmonkeyPatch();
  });
});