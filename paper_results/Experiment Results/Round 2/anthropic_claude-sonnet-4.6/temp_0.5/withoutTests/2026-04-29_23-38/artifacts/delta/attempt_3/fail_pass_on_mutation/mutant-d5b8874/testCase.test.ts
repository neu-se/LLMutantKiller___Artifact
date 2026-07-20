import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('correctly handles compose when thisOp has null retain and otherOp deletes', () => {
    // Op with retain: null - when composed with a delete
    // Original: typeof null === 'object' && null !== null => false, delete NOT pushed  
    // Mutated: typeof null === 'object' && true => true, delete IS pushed
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    // In original: condition false, nothing pushed, result is empty after chop
    // In mutated: delete IS pushed
    expect(result.ops).toHaveLength(0);
  });
});