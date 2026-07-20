import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty string", () => {
  it("should not create op when inserting empty string but create op for empty object", () => {
    const delta = new Delta();
    delta.insert("");  // Should not create op
    delta.insert({});  // Should create op

    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ insert: {} });
  });
});