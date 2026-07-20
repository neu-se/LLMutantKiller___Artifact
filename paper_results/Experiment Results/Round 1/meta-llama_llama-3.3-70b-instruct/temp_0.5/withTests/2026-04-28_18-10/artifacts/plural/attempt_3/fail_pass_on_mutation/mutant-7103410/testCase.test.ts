import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('test monkey patching', function () {
  it('should work as intended', function () {
    plural.monkeyPatch();
    expect(plural('test', 2)).toBe('tests');
    plural.unmonkeyPatch();
    expect(() => plural('test', 2)).not.toThrow();
  });
});