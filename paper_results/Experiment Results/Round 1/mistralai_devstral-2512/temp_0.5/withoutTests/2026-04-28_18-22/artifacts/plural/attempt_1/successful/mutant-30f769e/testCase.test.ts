import { plural, monkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('monkeyPatch', () => {
  it('should throw an error when monkeyPatch is called more than once', () => {
    monkeyPatch();
    expect(() => {
      monkeyPatch();
    }).toThrow('Unable to add plural function to String object');
  });
});