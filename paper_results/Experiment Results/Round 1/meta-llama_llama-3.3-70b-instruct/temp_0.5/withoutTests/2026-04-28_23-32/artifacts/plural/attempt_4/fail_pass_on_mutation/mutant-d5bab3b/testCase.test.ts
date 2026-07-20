import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "woman" with case sensitivity', () => {
    expect(plural('WoMan')).toBe('WoMen');
  });
});