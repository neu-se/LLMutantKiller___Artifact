import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should treat a non-object 'a' as empty and not copy its properties into result", () => {
    // When 'a' is a string (not an object), original code resets a = {}
    // so no keys from 'a' are added to attributes.
    // Mutated code leaves 'a' as the string, so for...in iterates over
    // string indices (e.g., "0", "1") and adds them to attributes.
    const a = "hello" as unknown as AttributeMap;
    const b = { bold: true };

    const result = AttributeMap.compose(a, b);

    // Original: a is reset to {}, result is just { bold: true }
    // Mutated: a remains "hello", for...in adds character indices to result
    expect(result).toEqual({ bold: true });
  });
});