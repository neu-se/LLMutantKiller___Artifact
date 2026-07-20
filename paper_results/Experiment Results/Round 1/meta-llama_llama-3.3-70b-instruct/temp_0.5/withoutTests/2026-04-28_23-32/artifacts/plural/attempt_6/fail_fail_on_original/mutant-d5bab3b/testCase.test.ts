import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "WoMan"', () => {
    expect(plural('WoMan', 2)).toBe('Women');
  });
});