import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should return empty delta for identical ops arrays', () => {
    const ops = [{ insert: 'test' }];
    const a = new Delta(ops);
    const b = new Delta(ops); // Same array reference

    // This test specifically checks the reference equality optimization
    const result = a.diff(b);

    // The key is that with the mutation, this goes through the full diff algorithm
    // which might handle certain edge cases differently
    expect(result.ops).toEqual([]);

    // Verify that the result is a new Delta instance
    expect(result).not.toBe(a);
    expect(result).not.toBe(b);
  });
});