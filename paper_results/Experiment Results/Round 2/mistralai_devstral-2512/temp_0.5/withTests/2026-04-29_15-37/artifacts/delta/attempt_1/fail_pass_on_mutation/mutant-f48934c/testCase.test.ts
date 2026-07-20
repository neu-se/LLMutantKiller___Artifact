import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty object", () => {
  it("should handle empty object insert without throwing", () => {
    const delta = new Delta();
    // This should work fine - inserting an empty object
    expect(() => {
      delta.insert({});
    }).not.toThrow();
    // The delta should contain the insert operation
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0]).toEqual({ insert: {} });
  });
});