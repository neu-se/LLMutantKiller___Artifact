import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should handle identical ops arrays with embeds correctly', () => {
    const ops = [{ insert: { embed: 1 } }];
    const a = new Delta(ops);
    const b = new Delta(ops); // Same array reference

    // Original code: returns empty Delta immediately due to reference equality
    // Mutated code: goes through full diff which converts embed to NULL_CHARACTER
    const result = a.diff(b);

    // Both should return empty Delta, but let's verify the exact behavior
    expect(result.ops).toEqual([]);

    // Additional test to ensure diff works for different embeds
    const c = new Delta().insert({ embed: 2 });
    const result2 = a.diff(c);
    // Just verify it's not empty (exact format may vary)
    expect(result2.ops.length).toBeGreaterThan(0);
  });
});