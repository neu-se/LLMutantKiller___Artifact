import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 for retain object op even when insert string is also present", () => {
    // An op with retain as object and insert as a string (unusual but tests the branch)
    const op = { retain: { key: "value" }, insert: "hello" } as Op;
    // Original: hits retain===object branch, returns 1
    // Mutated: hits else branch, returns op.insert.length = 5
    expect(Op.length(op)).toBe(1);
  });
});