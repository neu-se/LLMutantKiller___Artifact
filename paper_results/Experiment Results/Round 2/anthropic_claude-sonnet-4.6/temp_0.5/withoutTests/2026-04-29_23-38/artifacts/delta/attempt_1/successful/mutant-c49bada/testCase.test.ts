import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should treat non-object 'a' as empty object when composing", () => {
    // When 'a' is not an object (e.g., null cast to AttributeMap),
    // the original code resets a = {} so it doesn't contribute keys.
    // The mutated code leaves a as-is (non-object), so the for...in loop
    // over a non-object behaves differently.
    
    // We pass a non-object value for 'a' by using undefined default behavior
    // The key test: compose(undefined, { bold: true }) should work correctly
    // But more specifically, we need to trigger the mutation path where a is not an object
    
    // The mutation removes `a = {}` so when a is not an object,
    // the for...in loop `for (const key in a)` iterates over a non-object
    // In original: a becomes {}, so no keys from a are added
    // In mutated: a remains non-object, for...in on non-object string would iterate characters
    
    // Let's test with a string-like scenario by calling with explicit non-object
    // We need to cast to bypass TypeScript type checking
    const nonObjectA = "hello" as unknown as AttributeMap;
    const b = { bold: true };
    
    // Original: a gets reset to {}, so result should just be { bold: true }
    // Mutated: a remains "hello", for...in on string iterates indices "0","1","2","3","4"
    // So mutated result would include numeric indices from the string
    
    const result = AttributeMap.compose(nonObjectA, b);
    
    // In original code: result should be { bold: true }
    // In mutated code: result would include string character indices
    expect(result).toEqual({ bold: true });
  });
});