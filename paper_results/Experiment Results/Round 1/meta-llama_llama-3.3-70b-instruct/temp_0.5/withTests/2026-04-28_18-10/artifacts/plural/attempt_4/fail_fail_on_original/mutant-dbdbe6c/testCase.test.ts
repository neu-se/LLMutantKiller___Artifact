const plural = require('../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should not throw an error when String.prototype.plural is not defined', () => {
    delete (String.prototype as any).plural;
    expect(() => plural.monkeyPatch()).not.toThrowError();
  });
});