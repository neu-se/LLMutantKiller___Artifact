import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly push operation when index equals ops length after insert with attributes", () => {
    const delta = new Delta();
    delta.insert("a", { bold: true });
    delta.push({ insert: "b", attributes: { bold: true } });
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ insert: "ab", attributes: { bold: true } });
  });
});