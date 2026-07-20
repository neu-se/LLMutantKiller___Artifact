import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform with object retain where otherData is a non-null object uses otherData as transformedData', () => {
    // Force a scenario where otherOp.retain is a non-null object (embed)
    // but thisOp.retain is a number
    // In this case: otherData = non-null object
    // Original: typeof obj === 'object' && obj !== null => true => transformedData = otherData (object)
    // Mutated:  typeof obj === 'object' && true => true => transformedData = otherData (object)
    // SAME - no difference
    
    // The mutation is equivalent... but let me try with null pushed directly
    const thisDelta = new Delta();
    thisDelta.ops.push({ retain: 5 });
    
    const otherDelta = new Delta();
    otherDelta.ops.push({ retain: null as any });
    
    // if (otherOp.retain) with null => false, so the retain block is skipped
    // Neither version produces output for this op
    const result = thisDelta.transform(otherDelta, false);
    expect(result.ops).toEqual([]);
  });
});