import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should not push delete when thisOp retain is null after OpIterator processing', () => {
    // Create scenario where we need the null check to matter
    // The only difference between original and mutated is when thisOp.retain === null
    // We need to verify the correct behavior
    const a = new Delta([{ retain: null as any }, { insert: 'hello' }]);
    const b = new Delta([{ delete: 1 }, { retain: 5 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'hello' }]);
  });
});