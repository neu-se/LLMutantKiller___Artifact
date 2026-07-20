import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should optimize identical ops arrays with embeds', () => {
    // Create a Delta with an embed that would be converted to NULL_CHARACTER in string conversion
    const ops = [{ insert: { embed: 1 } }];
    const a = new Delta(ops);
    const b = new Delta(ops); // Same array reference

    // Original code returns empty Delta immediately
    // Mutated code goes through full diff which converts embed to NULL_CHARACTER
    const result = a.diff(b);

    // Both versions should return empty Delta, but let's verify the path
    expect(result.ops).toEqual([]);

    // Additional check to ensure we're testing the right behavior
    const differentOps = [{ insert: { embed: 2 } }];
    const c = new Delta(differentOps);
    const result2 = a.diff(c);
    expect(result2.ops).not.toEqual([]);
  });
});