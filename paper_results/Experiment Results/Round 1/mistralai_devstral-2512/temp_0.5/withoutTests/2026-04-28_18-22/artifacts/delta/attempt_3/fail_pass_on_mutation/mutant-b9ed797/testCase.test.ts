import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta push method", () => {
  it("should correctly append operation when no merging is possible", () => {
    const delta = new Delta();
    delta.insert("test");
    delta.push({ delete: 2 });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: "test" });
    expect(delta.ops[1]).toEqual({ delete: 2 });
  });
});