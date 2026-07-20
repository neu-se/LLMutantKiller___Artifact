import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty string", () => {
  it("should handle empty string insertion correctly", () => {
    const delta = new Delta().insert("");
    expect(delta.ops.length).toBe(0);
  });
});