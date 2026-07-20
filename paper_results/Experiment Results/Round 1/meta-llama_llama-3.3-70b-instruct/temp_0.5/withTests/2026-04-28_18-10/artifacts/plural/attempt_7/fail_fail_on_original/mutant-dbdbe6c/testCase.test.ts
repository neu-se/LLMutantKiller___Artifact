const plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('monkey patching', () => {
  it('should throw an error when String.prototype.plural is already defined in the mutated code but not in the original code', () => {
    (String.prototype as any).plural = () => 'custom plural function';
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});