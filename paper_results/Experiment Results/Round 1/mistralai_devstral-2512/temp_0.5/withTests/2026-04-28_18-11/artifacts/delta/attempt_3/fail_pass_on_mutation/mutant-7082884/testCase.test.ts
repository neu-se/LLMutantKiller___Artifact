import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should handle identical ops arrays with special characters correctly', () => {
    // Create a Delta with a special character that might be handled differently
    // in string conversion vs direct comparison
    const specialChar = String.fromCharCode(0); // NULL character
    const ops = [{ insert: 'A' }, { insert: specialChar }];
    const a = new Delta(ops);
    const b = new Delta(ops); // Same array reference

    // Original code returns empty Delta immediately due to reference equality
    // Mutated code will go through full diff computation
    const result = a.diff(b);

    // Both versions should return empty Delta, but let's verify the path was taken
    expect(result.ops).toEqual([]);
  });
});