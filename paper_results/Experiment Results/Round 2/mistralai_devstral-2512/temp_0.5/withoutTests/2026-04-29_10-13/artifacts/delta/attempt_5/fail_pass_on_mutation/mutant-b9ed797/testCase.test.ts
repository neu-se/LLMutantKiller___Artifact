import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly handle pushing operation after merge optimization", () => {
    const delta = new Delta();
    delta.insert("a");
    delta.insert("b");
    delta.push({ insert: "c" });
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ insert: "abc" });
  });
});