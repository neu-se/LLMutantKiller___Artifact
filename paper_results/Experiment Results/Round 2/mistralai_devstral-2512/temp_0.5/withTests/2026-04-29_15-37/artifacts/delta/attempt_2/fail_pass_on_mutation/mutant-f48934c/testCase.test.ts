import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with non-string argument", () => {
  it("should handle insert of object without length property", () => {
    const delta = new Delta();
    const testObj = { key: "value" }; // Object without length property
    expect(() => {
      delta.insert(testObj);
    }).not.toThrow();
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0]).toEqual({ insert: testObj });
  });
});