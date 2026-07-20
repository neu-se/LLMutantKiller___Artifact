import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose() with non-object first argument', () => {
  it('should treat a non-object first argument as empty object and not include string indices', () => {
    // When `a` is not an object (e.g., a string), the original code resets it to {}
    // The mutated code uses `if (false)` so it never resets `a` to {}
    // With the mutation, `for...in` on a string yields character indices as keys
    // causing those indices to appear in the result
    const nonObjectA = 'hello' as unknown as AttributeMap;
    const b = { bold: true };
    // Original: a is reset to {}, result is just { bold: true }
    // Mutated: a remains 'hello', for...in yields '0','1','2','3','4' which get added
    const result = AttributeMap.compose(nonObjectA, b);
    expect(result).toEqual({ bold: true });
  });
});