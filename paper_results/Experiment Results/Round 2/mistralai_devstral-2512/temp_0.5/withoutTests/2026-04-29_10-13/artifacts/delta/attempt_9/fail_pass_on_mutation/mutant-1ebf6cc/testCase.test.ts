import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() mutation detection", () => {
  it("should expose invalid type check in mutated code", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    // Original code: typeof op.retain === 'object' evaluates to true
    // Mutated code: typeof op.retain === "" is invalid syntax and will throw
    expect(() => Op.length(opWithRetainObject)).not.toThrow();
    expect(Op.length(opWithRetainObject)).toBe(1);
  });
});