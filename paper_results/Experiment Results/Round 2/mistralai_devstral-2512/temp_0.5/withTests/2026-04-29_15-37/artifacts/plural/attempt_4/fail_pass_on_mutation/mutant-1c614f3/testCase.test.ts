import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with exact match rules', () => {
  it('should correctly handle exact string match rules that return function results', () => {
    // This test specifically targets the mutation by using a rule that matches exactly
    // and returns a function result, which the mutation breaks
    expect(plural('memo')).toBe('memos');
  });
});