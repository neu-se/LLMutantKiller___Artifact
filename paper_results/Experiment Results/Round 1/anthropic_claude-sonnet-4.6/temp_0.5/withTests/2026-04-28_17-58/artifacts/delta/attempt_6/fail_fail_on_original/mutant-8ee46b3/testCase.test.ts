import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('correctly handles retain operations where otherData retain value is null-like', () => {
    // When thisOp is a retain and otherOp retain is null:
    // Original: typeof null === 'object' && null !== null -> false -> transformedData = length
    // Mutated:  true -> transformedData = null -> retain(null) produces different op
    const a = new Delta().retain(1);
    // Construct b with retain: null directly to expose the mutation
    const b = new Delta([{ retain: null as any }]);
    const result = a.transform(b, true);
    // Original: transformedData = length = 1, so retain(1) -> { retain: 1 }
    // Mutated:  transformedData = null, so retain(null) -> different behavior
    expect(result.ops).toEqual([{ retain: 1 }]);
  });
});