import plural = require("../../../../../../../../../subject_repositories/plural/index.js");

describe('plural', () => {
  it('should correctly handle the plural form of a word that has a custom rule', () => {
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('memo', 2)).toBe('memos');
    expect(plural('cactus', 2)).toBe('cacti');
  });
});