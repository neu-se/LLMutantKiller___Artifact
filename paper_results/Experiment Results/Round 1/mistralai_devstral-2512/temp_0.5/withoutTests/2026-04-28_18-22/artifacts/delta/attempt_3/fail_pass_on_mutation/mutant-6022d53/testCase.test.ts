import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transformPosition", () => {
  it("should handle insert at position 0 with priority correctly", () => {
    const delta = new Delta().insert("abc");
    const position = 0;
    const priority = true;
    const result = delta.transformPosition(position, priority);
    expect(result).toBe(0);
  });
});