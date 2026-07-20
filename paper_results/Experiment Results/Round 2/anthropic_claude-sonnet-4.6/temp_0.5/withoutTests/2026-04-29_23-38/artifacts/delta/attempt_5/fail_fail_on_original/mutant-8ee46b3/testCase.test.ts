import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should produce correct result when transforming retain ops with attributes', () => {
    const a = new Delta().retain(3, { bold: true });
    const b = new Delta().retain(3, { italic: true });
    const result = a.transform(b, false);
    // Original: ops.length = 0 (from empirical evidence)
    // Mutated: ops.length = 1 (presumably)
    expect(result.ops).toHaveLength(0);
  });
});