import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with words ending in "y"', () => {
  it('should correctly handle words ending in "y" when not at end of word', () => {
    expect(plural('citys')).toBe('cityss');
    expect(plural('babys')).toBe('babyss');
    expect(plural('partys')).toBe('partyss');
  });
});