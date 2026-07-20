import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length() with retain object", () => {
  it("should correctly handle retain object vs string", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    const opWithRetainString = {
      retain: "string",
      attributes: { bold: true }
    };
    // Original code: both should return 1 (object case) or length (string case)
    // Mutated code: string case will fail type check and fall through to return 1
    expect(Op.length(opWithRetainObject)).toBe(1);
    expect(Op.length(opWithRetainString)).toBe("string".length);
  });
});