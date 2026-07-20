import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap.diff() with non-object b argument', () => {
  it('should treat a non-object string b as empty object, not iterate over string indices', () => {
    // When b is a string, original resets b = {}, so Object.keys(b) = []
    // Mutated code leaves b as the string, so Object.keys("abc") = ["0","1","2"]
    // causing extra keys in the result
    const a = { bold: true };
    // @ts-ignore - intentionally passing non-object to test the guard
    const result = AttributeMap.diff(a, 'abc');
    // Original: b becomes {}, so result is { bold: null }
    // Mutated: b stays "abc", Object.keys("abc") = ["0","1","2"], adds those keys
    expect(result).toEqual({ bold: null });
  });
});