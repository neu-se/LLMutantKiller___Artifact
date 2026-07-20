import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should correctly compose embed retain object with delete operation', () => {
    // When thisOp has an embed retain (object) and otherOp is delete,
    // the delete should be pushed. This tests the positive case of the condition.
    // More importantly, when thisOp.retain is null (not a valid embed),
    // the original code's null check prevents pushing the delete.
    
    // Create a delta where retain is explicitly null to test null guard
    const a = new Delta();
    // Bypass push() to directly set ops with retain:null
    Object.assign(a, { ops: [{ retain: null }] });
    
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    
    // Original: typeof null === 'object' && null !== null => false => delete NOT pushed => []
    // Mutated:  typeof null === 'object' && true => true => delete IS pushed => [{delete:1}]
    expect(result.ops).toEqual([]);
  });
});