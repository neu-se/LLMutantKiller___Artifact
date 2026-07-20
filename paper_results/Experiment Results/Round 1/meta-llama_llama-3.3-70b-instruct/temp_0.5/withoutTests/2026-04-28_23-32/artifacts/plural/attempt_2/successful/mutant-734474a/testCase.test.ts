import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for an empty string', () => {
    expect(plural("", 2)).not.toBe('bacteria');
  });
});