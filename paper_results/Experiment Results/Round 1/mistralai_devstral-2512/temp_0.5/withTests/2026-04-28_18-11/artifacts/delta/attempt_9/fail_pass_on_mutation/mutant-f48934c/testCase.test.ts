import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty string", () => {
  it("should not create an op when inserting empty string", () => {
    const delta = new Delta();
    const result = delta.insert("");
    expect(result.ops.length).toBe(0);
    expect(result).toBe(delta); // Should return this
  });
});