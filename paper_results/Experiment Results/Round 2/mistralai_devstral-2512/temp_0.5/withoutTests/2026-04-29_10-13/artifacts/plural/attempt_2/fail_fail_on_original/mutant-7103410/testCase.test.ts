import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural monkeyPatch', () => {
  it('should correctly pluralize words when called as a String prototype method', () => {
    plural.monkeyPatch();
    const result = 'apple'.plural(2);
    expect(result).toBe('apples');
  });
});