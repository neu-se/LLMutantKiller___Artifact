import index from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form of a word', () => {
    index.monkeyPatch();
    expect('cat'.plural(2)).toBe('cats');
    index.unmonkeyPatch();
  });
});