import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should return undefined when b is a non-object non-null value like a string", () => {
    // When b is a string, typeof b !== 'object' is true
    // Original: nested if(typeof b !== 'object') { ... } executes some return/reset
    // Mutated: if(false) { ... } so the block is skipped
    const a: AttributeMap = { bold: true };
    // With original code, the inner if block executes (since b is string, not object)
    // The placeholder likely contains a return statement
    const result = AttributeMap.compose(a, "string" as any);
    expect(result).toBeUndefined();
  });
});