import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta push method", () => {
  it("should correctly push new operation when index equals ops length", () => {
    const delta = new Delta();
    delta.insert("test");
    const initialLength = delta.ops.length;
    delta.push({ insert: "new" });
    expect(delta.ops.length).toBe(initialLength + 1);
    expect(delta.ops[delta.ops.length - 1]).toEqual({ insert: "new" });
  });
});