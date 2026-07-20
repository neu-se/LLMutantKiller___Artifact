import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transformPosition", () => {
  it("should correctly handle insert at position 0 without priority", () => {
    const delta = new Delta().insert("abc");
    const position = 0;
    const priority = false;
    const result = delta.transformPosition(position, priority);
    expect(result).toBe(3);
  });
});