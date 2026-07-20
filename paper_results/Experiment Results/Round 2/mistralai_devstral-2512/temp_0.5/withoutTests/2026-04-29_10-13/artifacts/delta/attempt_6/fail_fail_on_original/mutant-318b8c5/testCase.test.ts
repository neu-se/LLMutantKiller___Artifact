import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta diff with insert", () => {
  it("should correctly handle insert operations with limited length", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().insert("world");
    const diff = delta1.diff(delta2);
    const hasDelete5 = diff.ops.some(op => op.delete === 5);
    const hasInsertWorld = diff.ops.some(op => op.insert === "world");
    expect(hasDelete5 && hasInsertWorld).toBe(true);
  });
});