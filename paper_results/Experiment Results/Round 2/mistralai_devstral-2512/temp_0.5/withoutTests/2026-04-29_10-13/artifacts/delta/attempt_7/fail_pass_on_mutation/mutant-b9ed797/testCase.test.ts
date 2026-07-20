import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly push operation when index equals ops length after merge", () => {
    const delta = new Delta();
    delta.insert("a");
    delta.insert("b");
    delta.push({ delete: 1 });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: "ab" });
    expect(delta.ops[1]).toEqual({ delete: 1 });
  });
});