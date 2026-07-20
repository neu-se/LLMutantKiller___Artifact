import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should not push delete when thisOp retain is null', () => {
    // Manually construct a delta with retain: null
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    // Original: condition is false (null !== null is false), so delete is NOT pushed
    // Mutated: condition is true, so delete IS pushed
    expect(result.ops).toEqual([]);
  });
});