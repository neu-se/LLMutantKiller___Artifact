import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that match string rules', () => {
    expect(plural('criterion')).toBe('criteria');
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('memo')).toBe('memos');
  });
});