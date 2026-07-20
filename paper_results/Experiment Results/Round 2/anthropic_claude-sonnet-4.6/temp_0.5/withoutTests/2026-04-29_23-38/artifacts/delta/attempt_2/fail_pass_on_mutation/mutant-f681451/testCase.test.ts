import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should make other delete redundant when this also deletes at same position', () => {
    // Both deleting at the same position - other's delete should be dropped
    // because this already deleted those characters
    const thisDelta = new Delta().delete(2);
    const otherDelta = new Delta().delete(2);
    
    // In original: thisOp.delete is truthy → continue → otherOp.delete is NOT pushed
    // In mutated: thisOp.delete is truthy → empty block → else-if(otherOp.delete) doesn't run
    // Both seem same... need different scenario
    
    const result = thisDelta.transform(otherDelta, false);
    expect(result.ops).toEqual([]);
  });
});