import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle rules with string results correctly', () => {
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('criterion', 1)).toBe('criterion');
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('bacterium', 1)).toBe('bacterium');
    expect(plural('memo', 2)).toBe('memos');
    expect(plural('memo', 1)).toBe('memo');
  });
});