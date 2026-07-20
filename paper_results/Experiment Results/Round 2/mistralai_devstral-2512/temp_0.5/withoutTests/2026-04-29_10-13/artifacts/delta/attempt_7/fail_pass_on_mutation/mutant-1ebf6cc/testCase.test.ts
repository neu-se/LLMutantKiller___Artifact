import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() mutation detection", () => {
  it("should correctly handle retain object case", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    // Original code: returns 1 for object case
    // Mutated code: condition becomes invalid (typeof "" is invalid), causing syntax error
    expect(Op.length(opWithRetainObject)).toBe(1);
  });
});