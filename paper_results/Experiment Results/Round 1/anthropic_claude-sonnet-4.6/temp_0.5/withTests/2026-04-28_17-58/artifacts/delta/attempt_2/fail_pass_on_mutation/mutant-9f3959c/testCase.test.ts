import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose', () => {
  it('does not copy keys from a that have undefined values when b lacks those keys', () => {
    // Construct a with a key explicitly set to undefined
    const a: Record<string, unknown> = { color: 'red' };
    a['bold'] = undefined;
    const b: Record<string, unknown> = { italic: true };

    const result = AttributeMap.compose(a, b);

    // Original: a[key] !== undefined fails for 'bold', so it is not added
    // Mutated: 'true && b[key] === undefined' passes for 'bold', so it gets added with value undefined
    // The result should only contain keys from b plus keys from a that are defined
    expect(result).toEqual({ italic: true, color: 'red' });
  });
});