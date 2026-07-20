import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta push method", () => {
  it("should append operation when index equals ops length", () => {
    const delta = new Delta();
    delta.insert("a");
    delta.push({ insert: "b" });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: "a" });
    expect(delta.ops[1]).toEqual({ insert: "b" });
  });
});