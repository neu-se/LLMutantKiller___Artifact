import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose', () => {
  it('does not include keys from a with undefined values when b lacks those keys', () => {
    // Construct a with a key explicitly set to undefined
    const a: Record<string, unknown> = { color: 'red' };
    a['bold'] = undefined;
    const b: Record<string, unknown> = { italic: true };

    const result = AttributeMap.compose(a, b);

    // Original: a[key] !== undefined fails for 'bold', so 'bold' is never added
    // Mutated: 'true && b[key] === undefined' passes for 'bold', so 'bold' gets added with value undefined
    // Verify 'bold' key is not present in result at all
    expect(result).not.toBeUndefined();
    expect(Object.keys(result as object)).not.toContain('bold');
    expect(Object.keys(result as object).sort()).toEqual(['color', 'italic']);
  });
});