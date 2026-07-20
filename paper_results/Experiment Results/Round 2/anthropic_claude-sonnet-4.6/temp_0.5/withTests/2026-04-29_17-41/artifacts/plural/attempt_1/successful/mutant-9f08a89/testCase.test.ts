import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkeyPatch error message', () => {
  it('should throw an error with the correct message when String.prototype.plural is already defined', () => {
    // First call to set up String.prototype.plural
    plural.monkeyPatch();

    // Second call should throw because plural is already defined
    expect(() => {
      plural.monkeyPatch();
    }).toThrow('Unable to add plural function to String object');

    // Clean up
    plural.unmonkeyPatch();
  });
});