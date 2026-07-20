import { plural, monkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should throw an error when monkeyPatch is called more than once', () => {
    // First call should succeed
    monkeyPatch();

    // Second call should throw an error in the original code
    expect(() => {
      monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
  });
});