import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta diff with insert", () => {
  it("should correctly handle insert operations with limited length", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().insert("world");
    const diff = delta1.diff(delta2);
    const ops = diff.ops;
    expect(ops.some(op => op.delete === 5 && op.insert === undefined)).toBe(true);
    expect(ops.some(op => op.insert === "world" && op.delete === undefined)).toBe(true);
  });
});