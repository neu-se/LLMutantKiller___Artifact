const plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should throw an error when String.prototype.plural is already defined', () => {
    (String.prototype as any).plural = () => 'custom plural function';
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
    delete (String.prototype as any).plural;
  });
  it('should not throw an error when String.prototype.plural is not defined', () => {
    delete (String.prototype as any).plural;
    expect(() => plural.monkeyPatch()).not.toThrowError();
  });
});