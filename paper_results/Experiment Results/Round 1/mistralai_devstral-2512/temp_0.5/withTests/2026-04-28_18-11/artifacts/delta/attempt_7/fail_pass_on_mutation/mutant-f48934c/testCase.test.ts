import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty string", () => {
  it("should not create an op when inserting empty string", () => {
    const delta = new Delta().insert("");
    expect(delta.ops.length).toBe(0);

    // Also test that non-empty strings still work
    const delta2 = new Delta().insert("test");
    expect(delta2.ops.length).toBe(1);
    expect(delta2.ops[0]).toEqual({ insert: "test" });
  });
});