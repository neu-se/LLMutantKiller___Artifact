import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.compose() with non-object first argument', () => {
  it('should treat a non-object first argument as empty object', () => {
    // When `a` is not an object (e.g., a string), the original code resets it to {}
    // The mutated code skips the assignment `a = {}`, so `a` remains a string
    // This means the for...in loop over `a` would iterate over string characters
    // and the result would differ from the expected behavior
    const b = { bold: true };
    // Pass a non-object as `a` by casting through unknown
    const result = AttributeMap.compose(
      'not-an-object' as unknown as AttributeMap,
      b,
    );
    // In the original code, `a` is reset to {}, so no keys from `a` are merged
    // The result should just be `b`
    expect(result).toEqual({ bold: true });
  });
});