import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with null retain in other delta', () => {
  it('should use length as transformedData when otherOp retain is null', () => {
    // The mutation changes: typeof otherData === 'object' && otherData !== null
    // to: typeof otherData === 'object' && true
    // When otherData is null: typeof null === 'object' is true
    // Original: true && false (null !== null) => false => uses length
    // Mutated: true && true => true => uses null
    const thisDelta = new Delta().retain(5);
    const otherDelta = new Delta();
    // Directly push a retain: null op to bypass validation
    otherDelta.ops.push({ retain: null as any });

    const result = thisDelta.transform(otherDelta, false);

    // With original code: transformedData = 5 (length), so retain(5) is called
    // With mutated code: transformedData = null, retain(null) returns early (length <= 0 check fails for non-number)
    // Actually retain checks: typeof length === 'number' && length <= 0
    // null is not a number, so it won't return early, but retain({null}) would be odd
    // Let's check what retain(null) does: newOp = { retain: null }, then push({ retain: null })
    // The result ops would differ
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0].retain).toBe(5);
  });
});