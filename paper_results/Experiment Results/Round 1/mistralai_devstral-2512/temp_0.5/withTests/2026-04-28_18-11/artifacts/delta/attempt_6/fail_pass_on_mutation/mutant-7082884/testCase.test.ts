import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should return empty delta when comparing identical ops array references', () => {
    const sharedOps = [{ insert: 'test' }];
    const a = new Delta(sharedOps);
    const b = new Delta(sharedOps); // Same array reference

    // Original code: returns empty Delta immediately due to reference equality
    // Mutated code: goes through full diff computation
    const result = a.diff(b);

    // Both versions should return empty Delta, but the path taken is different
    expect(result.ops).toEqual([]);
  });
});