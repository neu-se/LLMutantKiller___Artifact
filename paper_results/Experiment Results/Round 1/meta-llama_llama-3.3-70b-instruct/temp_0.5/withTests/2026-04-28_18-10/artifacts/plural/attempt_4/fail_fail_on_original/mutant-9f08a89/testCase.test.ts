import { plural } from "../../../../../../../../../../../subject_repositories/plural/index";

describe('plural', () => {
  it('should throw an error when trying to monkey patch String.prototype if it already has a plural function', () => {
    plural.monkeyPatch();
    const error = new Error('Unable to add plural function to String object');
    expect(() => plural.monkeyPatch()).toThrowError(error.message);
  });
});