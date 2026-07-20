import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should append operation when no merging conditions are met", () => {
    const delta = new Delta();
    delta.insert("a");
    delta.push({ delete: 1 });
    delta.push({ insert: "b" });
    expect(delta.ops.length).toBe(3);
    expect(delta.ops[0]).toEqual({ insert: "a" });
    expect(delta.ops[1]).toEqual({ delete: 1 });
    expect(delta.ops[2]).toEqual({ insert: "b" });
  });
});