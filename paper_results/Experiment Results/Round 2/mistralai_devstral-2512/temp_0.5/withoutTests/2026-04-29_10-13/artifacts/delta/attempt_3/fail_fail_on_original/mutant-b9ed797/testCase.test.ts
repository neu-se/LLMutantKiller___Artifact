import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly handle pushing multiple operations", () => {
    const delta = new Delta();
    delta.insert("first");
    delta.insert("second");
    delta.push({ insert: "third" });
    expect(delta.ops.length).toBe(3);
    expect(delta.ops[2]).toEqual({ insert: "third" });
  });
});