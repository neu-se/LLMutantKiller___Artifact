import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap.diff() with non-object b argument', () => {
  it('should treat non-object b as empty object and return null for all keys in a', () => {
    // When b is not an object, the original code sets b = {}
    // The mutated code leaves b as-is (non-object), which causes incorrect behavior
    // when the reduce tries to access b[key]
    const a = { bold: true, color: 'red' };
    // Calling diff with a valid a and undefined b (which defaults to {})
    // should return { bold: null, color: null }
    const result = AttributeMap.diff(a, undefined);
    expect(result).toEqual({ bold: null, color: null });
  });
});