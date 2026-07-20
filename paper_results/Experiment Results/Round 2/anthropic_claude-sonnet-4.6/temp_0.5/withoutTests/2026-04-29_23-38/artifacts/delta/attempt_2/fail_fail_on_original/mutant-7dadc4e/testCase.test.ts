import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should use length when otherData retain is null', () => {
    // Force a retain:null op into the delta
    const thisDelta = new Delta([{ retain: 5 }]);
    const otherDelta = new Delta([]);
    // Directly set ops to have retain:null
    otherDelta.ops = [{ retain: null as any }];

    const result = thisDelta.transform(otherDelta, false);
    // Original: typeof null === 'object' && null !== null => false => transformedData = length = 5 => retain(5)
    // Mutated: typeof null === 'object' && true => true => transformedData = null => retain(null) which is ignored/chopped
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].retain).toBe(5);
  });
});