import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkeyPatch behavior', () => {
  it('should throw an error when monkeyPatch is called twice', () => {
    // First call should succeed
    plural.monkeyPatch();

    // Second call should throw an error in the original code
    expect(() => {
      plural.monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
  });
});