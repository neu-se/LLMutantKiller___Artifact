import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should treat non-object 'a' as empty object when composing", () => {
    // When 'a' is not an object (e.g., null cast to AttributeMap),
    // the original code sets a = {} so it doesn't contribute keys.
    // The mutated code skips the assignment, leaving a as null/non-object,
    // which causes the for...in loop to fail or behave unexpectedly.
    
    // We can test this by passing a non-object value for 'a'.
    // Since TypeScript types prevent direct passing of non-objects,
    // we use type casting to simulate the mutation scenario.
    const a = null as unknown as AttributeMap;
    const b = { bold: true };
    
    // Original: a is set to {}, so compose returns { bold: true }
    // Mutated: a remains null, and `for (const key in null)` may throw or behave differently
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ bold: true });
  });
});