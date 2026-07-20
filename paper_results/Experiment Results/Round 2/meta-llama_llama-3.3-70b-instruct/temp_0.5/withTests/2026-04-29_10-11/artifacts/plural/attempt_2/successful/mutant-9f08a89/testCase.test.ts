import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should throw an error with a meaningful message when attempting to add a plural function to the String object twice', () => {
    plural.monkeyPatch();
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});