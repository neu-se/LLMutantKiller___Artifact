import { plural, monkeyPatch, unmonkeyPatch } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should throw an error when trying to add plural function to String object if it already exists', () => {
    monkeyPatch();
    expect(() => monkeyPatch()).toThrowError('Unable to add plural function to String object');
    unmonkeyPatch();
  });
});