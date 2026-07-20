import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() with retain object", () => {
  it("should distinguish between retain object and other cases", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    const opWithRetainNumber = {
      retain: 5,
      attributes: { bold: true }
    };
    // Original: object case returns 1, number case returns 5
    // Mutated: object case falls through to return 1 (same), number case unchanged
    expect(Op.length(opWithRetainObject)).toBe(1);
    expect(Op.length(opWithRetainNumber)).toBe(5);
  });
});