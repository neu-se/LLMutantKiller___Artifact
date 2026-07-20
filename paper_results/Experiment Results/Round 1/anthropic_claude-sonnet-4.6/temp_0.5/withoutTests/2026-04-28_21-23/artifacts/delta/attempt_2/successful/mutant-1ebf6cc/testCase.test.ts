import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 for retain with object value even when insert is also present as a string", () => {
    // An op with retain as object - in original code, the object retain branch returns 1
    // In mutated code, typeof op.retain === "" is always false, so it falls to else branch
    // If insert is also a string, else branch returns insert.length instead of 1
    const op = { retain: { key: "value" }, insert: "hello" } as Op;
    expect(Op.length(op)).toBe(1);
  });
});