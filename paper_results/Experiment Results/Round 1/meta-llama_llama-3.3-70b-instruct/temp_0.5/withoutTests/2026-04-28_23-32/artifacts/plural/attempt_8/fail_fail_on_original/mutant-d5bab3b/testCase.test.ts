import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "woman" and "WoMan"', () => {
    expect(plural('woman', 2)).toBe('women');
    expect(plural('WoMan', 2)).toBe('WoMen');
    expect(plural('woman', 2)).toBe(plural('WoMan', 2));
  });
});