import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should treat non-object 'a' as empty object when a is not an object", () => {
    // When 'a' is not an object (e.g., a string), the original code converts it to {}
    // The mutated code uses `if (false)` which means it never converts non-object 'a' to {}
    // This means the for...in loop over 'a' will iterate over string characters
    // We can detect this by passing a non-object value for 'a'
    
    // In the original: typeof a !== 'object' => a = {}, so compose("hello", {bold: true}) 
    // should return {bold: true}
    // In the mutated version: 'a' stays as "hello", and the for...in loop iterates string indices
    // which would add numeric keys to attributes
    
    const result = AttributeMap.compose("hello" as any, { bold: true });
    
    // Original behavior: a is converted to {}, so only b's attributes matter
    // Result should be {bold: true}
    expect(result).toEqual({ bold: true });
  });
});