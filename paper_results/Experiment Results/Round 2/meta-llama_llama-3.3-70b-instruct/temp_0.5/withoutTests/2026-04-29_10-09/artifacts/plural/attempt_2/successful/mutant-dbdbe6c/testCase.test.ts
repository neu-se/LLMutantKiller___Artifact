import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not override existing plural function', () => {
    String.prototype.plural = () => 'custom implementation';
    expect(() => plural.monkeyPatch()).toThrowError('Unable to add plural function to String object');
  });
});