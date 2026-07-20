import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle rules with functions', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('cactus', 1)).toBe('cactus');
  });
});