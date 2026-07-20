import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() mutation detection", () => {
  it("should fail when retain object check is mutated", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    // This test will pass on original code (returns 1 for object)
    // but fail on mutated code where the condition becomes invalid
    expect(Op.length(opWithRetainObject)).toBe(1);
  });
});