import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.compose() with non-object first argument', () => {
  it('should treat a non-object first argument as empty object', () => {
    // When `a` is not an object (e.g., a string), the original code converts it to {}
    // The mutated code uses `if (false)` so it never converts `a` to {},
    // causing the function to behave incorrectly when `a` is not an object.
    const b = { bold: true, color: 'red' };
    // Pass a non-object as `a` - original code converts it to {}, mutated code does not
    const result = AttributeMap.compose('not-an-object' as unknown as AttributeMap, b);
    // With original code: a becomes {}, so result is just b's attributes
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});