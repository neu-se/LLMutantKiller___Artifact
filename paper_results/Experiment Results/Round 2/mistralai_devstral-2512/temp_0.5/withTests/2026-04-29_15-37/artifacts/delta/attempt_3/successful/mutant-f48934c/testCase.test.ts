import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty array", () => {
  it("should insert empty array as embed", () => {
    const delta = new Delta();
    const emptyArray = []; // Has length property that equals 0
    expect(() => {
      delta.insert(emptyArray);
    }).not.toThrow();
    // Should insert the array as an embed
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0]).toEqual({ insert: [] });
  });
});