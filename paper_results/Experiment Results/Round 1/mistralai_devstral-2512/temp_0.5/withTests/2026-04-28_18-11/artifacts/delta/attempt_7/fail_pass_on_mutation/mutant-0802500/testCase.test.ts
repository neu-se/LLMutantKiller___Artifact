import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle insert at boundary of retain optimization", () => {
    const a = new Delta().insert("A");
    const b = new Delta().retain(1).insert("B");
    const result = a.compose(b);
    // The mutation changes the condition from checking 'insert' to checking empty string
    // This should fail on mutated code because it won't properly handle the insert case
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toEqual({ insert: "AB" });
  });
});