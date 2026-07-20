import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty object", () => {
  it("should handle empty object insertion correctly", () => {
    const delta = new Delta().insert({});
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ insert: {} });
  });
});