import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should throw an error when trying to monkey patch String object if it already exists', () => {
    plural.monkeyPatch();
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});