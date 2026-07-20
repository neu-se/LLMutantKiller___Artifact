import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transformPosition", () => {
  it("should correctly transform position when insert operation occurs at the same index with priority", () => {
    const delta = new Delta().insert("abc");
    const position = 1;
    const priority = true;
    const result = delta.transformPosition(position, priority);
    expect(result).toBe(1);
  });
});