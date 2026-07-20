import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() mutation detection", () => {
  it("should fail when retain object check is mutated to invalid syntax", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    // Original code: typeof op.retain === 'object' is valid
    // Mutated code: typeof op.retain === "" is invalid syntax
    expect(Op.length(opWithRetainObject)).toBe(1);
  });
});