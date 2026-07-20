import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.compose() with non-object first argument', () => {
  it('should treat a non-object first argument as empty object', () => {
    // When `a` is not an object (e.g., a string), the original code converts it to {}
    // The mutated code uses `if (false)` so it never resets `a` to {}
    // This means the non-object `a` will be iterated with `for...in`, which behaves differently
    const nonObjectA = 'not-an-object' as unknown as AttributeMap;
    const b = { bold: true };
    // In the original code, `a` is reset to {} so no keys from the string are included
    // In the mutated code, `a` remains a string, and `for...in` on a string yields character indices
    // The result should only contain keys from `b`
    const result = AttributeMap.compose(nonObjectA, b);
    expect(result).toEqual({ bold: true });
  });
});