import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should append operation when index equals ops length and no merging occurs", () => {
    const delta = new Delta();
    delta.insert("a");
    delta.push({ retain: 1, attributes: { bold: true } });
    delta.push({ insert: "b" });
    expect(delta.ops.length).toBe(3);
    expect(delta.ops[0]).toEqual({ insert: "a" });
    expect(delta.ops[1]).toEqual({ retain: 1, attributes: { bold: true } });
    expect(delta.ops[2]).toEqual({ insert: "b" });
  });
});