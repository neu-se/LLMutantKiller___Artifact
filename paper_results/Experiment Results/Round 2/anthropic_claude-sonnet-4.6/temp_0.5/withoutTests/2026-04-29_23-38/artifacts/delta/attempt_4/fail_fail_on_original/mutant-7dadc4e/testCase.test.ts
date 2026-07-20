import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should use length not null as transformedData when otherOp retain is null', () => {
    const thisDelta = new Delta();
    thisDelta.ops = [{ retain: 5 }];
    const otherDelta = new Delta();
    // retain:null with attributes so it won't be chopped and is "truthy" in retain check
    otherDelta.ops = [{ retain: null as any, attributes: { bold: true } }];
    
    const result = thisDelta.transform(otherDelta, false);
    // Original: transformedData = length = 5 → retain(5, attrs) → [{retain:5, attributes:{bold:true}}]
    // Mutated: transformedData = null → retain(null, attrs) → [{retain:null, attributes:{bold:true}}]
    expect(result.ops[0]?.retain).toBe(5);
  });
});