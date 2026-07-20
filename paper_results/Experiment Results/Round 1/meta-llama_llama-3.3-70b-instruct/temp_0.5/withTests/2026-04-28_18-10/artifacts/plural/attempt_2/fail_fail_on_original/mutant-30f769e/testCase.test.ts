import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should throw an error when trying to add plural function to String object if it already exists and then fails to add it', () => {
    plural.monkeyPatch();
    expect(() => plural.monkeyPatch()).not.toThrowError();
    plural.unmonkeyPatch();
    plural.monkeyPatch();
    expect(String.prototype.plural).toBeDefined();
  });
});