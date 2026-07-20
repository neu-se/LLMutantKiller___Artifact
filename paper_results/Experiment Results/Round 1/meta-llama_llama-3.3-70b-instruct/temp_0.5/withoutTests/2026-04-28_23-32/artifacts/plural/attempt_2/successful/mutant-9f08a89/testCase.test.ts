import * as plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should throw an error with a meaningful message when trying to monkey patch String.prototype.plural twice', () => {
    plural.monkeyPatch();
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});