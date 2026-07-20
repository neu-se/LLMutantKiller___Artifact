import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkey patching', () => {
  it('should throw an error when String.prototype.plural is already defined', () => {
    String.prototype.plural = () => 'custom plural function';
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});