import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly push operation when index is at end of ops array", () => {
    const delta = new Delta();
    delta.insert("test");
    delta.delete(1);
    const initialLength = delta.ops.length;
    delta.push({ retain: 2 });
    expect(delta.ops.length).toBe(initialLength + 1);
    expect(delta.ops[delta.ops.length - 1]).toEqual({ retain: 2 });
  });
});