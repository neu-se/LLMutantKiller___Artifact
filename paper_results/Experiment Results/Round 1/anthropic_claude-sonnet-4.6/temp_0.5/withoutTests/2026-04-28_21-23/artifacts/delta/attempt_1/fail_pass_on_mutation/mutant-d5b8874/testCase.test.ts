import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with null retain', () => {
  it('should not push delete op when thisOp has null retain during compose', () => {
    // Create a delta with an op that has retain: null explicitly
    // We need thisOp.retain to be null to expose the mutation
    // When composing: this has retain:null, other has delete
    // Original: condition false (null !== null fails), so delete NOT pushed
    // Mutated: condition true (true replaces null check), so delete IS pushed
    const base = new Delta([{ retain: null as any }]);
    const other = new Delta([{ delete: 1 }]);
    const result = base.compose(other);
    // With original: delete is not pushed (condition fails for null retain)
    // With mutated: delete IS pushed
    expect(result.ops).toEqual([]);
  });
});