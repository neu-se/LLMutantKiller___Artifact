import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should handle empty string insertion differently from non-empty strings", () => {
    const delta = new Delta();
    delta.insert("");
    delta.insert("test");
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toBe("test");
  });
});