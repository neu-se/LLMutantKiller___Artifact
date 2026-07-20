// Jest test file containing exactly one test case
import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe("AttributeMap.compose", () => {
  it("should handle non-object b by treating it as empty object", () => {
    // When b is not an object (e.g., null), the original code resets b to {}
    // The mutation changes `if (typeof b !== 'object')` to `if (false)`,
    // which means the reset-to-{} logic is skipped
    const a: AttributeMap = { bold: true, color: "red" };
    // Pass null as b - when b is not an object, original resets b to {}
    // so compose(a, null) should behave like compose(a, {}) = { bold: true, color: "red" }
    const result = AttributeMap.compose(a, null as any);
    expect(result).toEqual({ bold: true, color: "red" });
  });
});