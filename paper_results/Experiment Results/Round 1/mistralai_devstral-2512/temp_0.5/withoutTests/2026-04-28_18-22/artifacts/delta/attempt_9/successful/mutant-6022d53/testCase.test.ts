import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transformPosition", () => {
  it("should correctly transform position when insert occurs at position 1 with priority", () => {
    const delta = new Delta().insert("abc");
    const position = 1;
    const priority = true;
    const result = delta.transformPosition(position, priority);
    expect(result).toBe(4);
  });
});