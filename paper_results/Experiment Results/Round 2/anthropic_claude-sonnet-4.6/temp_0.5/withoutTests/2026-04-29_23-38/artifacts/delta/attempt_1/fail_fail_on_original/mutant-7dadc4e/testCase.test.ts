import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with null retain', () => {
  it('should use length as transformedData when otherData is null, not null itself', () => {
    // Create a delta where retain is null by directly manipulating ops
    const thisDelta = new Delta([{ retain: 5 }]);
    // Create other delta with a retain that is null (edge case)
    const otherDelta = new Delta();
    otherDelta.ops = [{ retain: null as any }];
    
    const result = thisDelta.transform(otherDelta, false);
    // With original: transformedData = length (5) since null !== null is false
    // With mutated: transformedData = null since true makes condition true
    expect(result.ops[0].retain).toBe(5);
  });
});