import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should throw an error with a specific message when trying to monkey patch String.prototype if it already has a plural function', () => {
    plural.monkeyPatch();
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
    expect(() => plural.monkeyPatch()).not.toThrowError('');
  });
});