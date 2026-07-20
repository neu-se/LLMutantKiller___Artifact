import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transformPosition", () => {
  it("should correctly transform position when insert occurs at same index without priority", () => {
    const delta = new Delta().insert("test");
    const position = 2;
    const priority = false;
    const result = delta.transformPosition(position, priority);
    expect(result).toBe(6);
  });
});