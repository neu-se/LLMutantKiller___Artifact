import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('correctly handles retain with null value in transform', () => {
    // When thisOp.retain is a number and otherOp.retain is null,
    // original: transformedData = length (because null !== null check fails)
    // mutated: transformedData = null (because null !== null check is removed)
    const a = new Delta().retain(1, { bold: true });
    const b = new Delta([{ retain: null as any, attributes: { italic: true } }]);
    
    const result = a.transform(b, false);
    // With original: retain(length=1, ...) -> { retain: 1, ... }
    // With mutated: retain(null, ...) -> different result
    expect(result.ops[0].retain).toBe(1);
  });
});