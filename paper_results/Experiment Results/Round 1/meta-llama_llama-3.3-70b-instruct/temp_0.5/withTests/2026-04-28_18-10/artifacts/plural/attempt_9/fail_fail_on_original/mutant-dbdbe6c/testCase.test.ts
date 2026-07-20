const plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should check if String.prototype.plural is already defined before attempting to override it', () => {
    (String.prototype as any).plural = () => 'custom plural function';
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
    delete (String.prototype as any).plural;
    expect(() => plural.monkeyPatch()).not.toThrowError();
  });
});