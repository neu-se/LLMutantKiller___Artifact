import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should use reference equality optimization for identical ops arrays', () => {
    const ops = [{ insert: 'test' }];
    const a = new Delta(ops);
    const b = new Delta(ops); // Same array reference
    const result = a.diff(b);
    expect(result.ops).toEqual([]);
    expect(result).not.toBe(a); // Should return a new Delta instance
    expect(result).not.toBe(b);
  });
});