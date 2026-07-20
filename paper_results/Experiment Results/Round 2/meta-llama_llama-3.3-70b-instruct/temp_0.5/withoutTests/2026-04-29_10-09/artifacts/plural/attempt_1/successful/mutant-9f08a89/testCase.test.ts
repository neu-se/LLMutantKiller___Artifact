import { plural, monkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should throw an error with a meaningful message when trying to monkey patch String.prototype.plural twice', () => {
    monkeyPatch();
    expect(() => monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});