import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('monkey patching', () => {
  it('should not override existing plural function', () => {
    String.prototype.plural = () => 'custom plural function';
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});