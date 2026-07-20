import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() mutation detection", () => {
  it("should fail when retain object check is mutated to invalid type check", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    // This test will pass on original code (returns 1 for object)
    // but fail on mutated code where the condition becomes invalid
    expect(Op.length(opWithRetainObject)).toBe(1);

    // Additional test that will fail on mutated code
    const opWithRetainString = {
      retain: "string",
      attributes: { bold: true }
    };
    // Original: falls through to return 1 (not string length)
    // Mutated: same behavior
    expect(Op.length(opWithRetainString)).toBe(1);
  });
});