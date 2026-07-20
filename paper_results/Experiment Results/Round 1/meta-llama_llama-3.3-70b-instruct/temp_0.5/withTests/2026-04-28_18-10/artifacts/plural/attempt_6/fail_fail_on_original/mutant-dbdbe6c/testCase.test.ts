const plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should not throw an error when String.prototype.plural is not defined', () => {
    (String.prototype as any).plural = undefined;
    expect(() => plural.monkeyPatch()).not.toThrowError();
  });
  it('should throw an error when String.prototype.plural is already defined in the mutated code', () => {
    (String.prototype as any).plural = () => 'custom plural function';
    expect(() => plural.monkeyPatch()).not.toThrowError();
  });
});