import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should handle empty string insertion correctly", () => {
    const delta = new Delta();
    delta.insert("");
    expect(delta.ops).toEqual([]);
    delta.insert("test");
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0].insert).toBe("test");
  });
});