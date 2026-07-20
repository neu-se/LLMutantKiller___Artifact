import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should not include keys from a that are explicitly set to undefined when b does not have them", () => {
    // The mutation changes `if (a[key] !== undefined && b[key] === undefined)` to `if (true && b[key] === undefined)`
    // This means in the mutated code, keys from `a` with value `undefined` will be added to attributes
    // In the original code, keys from `a` with value `undefined` should NOT be added

    const a: { [key: string]: unknown } = {};
    // Explicitly set a key to undefined in object a
    a["bold"] = undefined;

    const b = { italic: true };

    // In original: a["bold"] is undefined, so condition `a[key] !== undefined` is false, "bold" is NOT added
    // In mutated: condition is always true, so "bold" IS added (as undefined), but then filtered... 
    // Wait, let's think more carefully.
    // 
    // With keepNull=false (default), attributes starts as clone of b with nulls removed = { italic: true }
    // Then for key "bold" in a:
    //   Original: a["bold"] !== undefined (false) && b["bold"] === undefined (true) => false, so NOT added
    //   Mutated: true && b["bold"] === undefined (true) => true, so attributes["bold"] = undefined is added
    //
    // After the loop, attributes = { italic: true, bold: undefined }
    // Object.keys(attributes) will include "bold" since it was explicitly set
    // So the result will include "bold: undefined" in mutated version
    
    const result = AttributeMap.compose(a, b);
    
    // In original code: result should be { italic: true } (bold not included since a["bold"] is undefined)
    // In mutated code: result would include bold key with undefined value
    
    expect(result).toEqual({ italic: true });
    expect(result).not.toHaveProperty("bold");
  });
});