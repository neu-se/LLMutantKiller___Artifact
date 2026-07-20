import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly push operation when index equals ops length with different attributes", () => {
    const delta = new Delta();
    delta.insert("test", { bold: true });
    delta.push({ insert: "new", attributes: { italic: true } });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: "test", attributes: { bold: true } });
    expect(delta.ops[1]).toEqual({ insert: "new", attributes: { italic: true } });
  });
});