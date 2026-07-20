import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with exact match rules', () => {
  it('should correctly handle exact string match rules', () => {
    expect(plural('memo')).toBe('memos');
    expect(plural('cello')).toBe('cellos');
  });
});