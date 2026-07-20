import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.diff with non-object b', () => {
  it('should treat non-object b as empty object and return null keys for all a keys', () => {
    // When b is not an object, the diff function should reassign b = {}
    // so all keys in a should appear as null in the result
    // With the mutation (if false), b is not reset to {}, causing different behavior
    const a = { bold: true, color: 'red' };
    // Cast to any to bypass TypeScript type checking
    const result = AttributeMap.diff(a, 'not-an-object' as any);
    // When b is treated as {}, all keys from a should be set to null
    expect(result).toEqual({ bold: null, color: null });
  });
});