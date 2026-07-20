import { plural, monkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should throw an error when attempting to monkey patch String.prototype.plural if it is already defined', () => {
    monkeyPatch();
    String.prototype.plural = function(num) {
      return plural(this, num);
    };
    expect(() => monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});