import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should not push delete op when thisOp retain is null', () => {
    // Create delta with retain:null op directly
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    // Original: typeof null === 'object' && null !== null => false, so delete NOT pushed
    // Mutated: typeof null === 'object' && true => true, so delete IS pushed
    expect(result.ops).not.toContainEqual({ delete: 1 });
  });
});