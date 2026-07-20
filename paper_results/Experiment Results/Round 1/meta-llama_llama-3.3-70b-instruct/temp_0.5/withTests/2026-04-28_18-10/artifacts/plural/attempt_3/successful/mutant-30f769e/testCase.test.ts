import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should not throw an error when trying to add plural function to String object if it already exists', () => {
    plural.monkeyPatch();
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});