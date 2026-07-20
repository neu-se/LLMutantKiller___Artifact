import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly push operation when ops array is empty", () => {
    const delta = new Delta();
    delta.push({ insert: "first" });
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ insert: "first" });
  });
});