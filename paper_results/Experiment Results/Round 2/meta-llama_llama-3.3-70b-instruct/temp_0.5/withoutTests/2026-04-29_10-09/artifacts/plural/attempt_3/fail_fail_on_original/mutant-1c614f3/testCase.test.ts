import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should correctly handle the plural form of a word that has a custom rule', () => {
    const result = plural('criterion', 2);
    expect(result).toBe('criteria');
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('memo', 2)).toBe('memos');
    expect(plural('cactus', 2)).toBe('cacti');
  });
});