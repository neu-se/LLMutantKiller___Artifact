import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should treat non-object a as empty object when a is not an object type', () => {
    // When `a` is not an object, the original code sets a = {} so the for...in loop
    // over `a` iterates over nothing extra. The mutated code skips the assignment,
    // leaving `a` as a string, causing the for...in loop to iterate over string indices
    // and potentially add unexpected numeric keys to the result.
    
    const b = { bold: true };
    // @ts-ignore - intentionally passing wrong type to test runtime behavior
    const result = AttributeMap.compose('hello', b);
    
    // Original: a is reset to {}, so no extra keys from 'hello' are added
    // Result should only contain b's keys
    expect(result).toEqual({ bold: true });
  });
});