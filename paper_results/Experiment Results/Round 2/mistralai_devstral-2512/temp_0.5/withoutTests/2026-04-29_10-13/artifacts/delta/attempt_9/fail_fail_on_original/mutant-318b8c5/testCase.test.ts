import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta diff with insert", () => {
  it("should correctly handle insert operations with limited length", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().insert("world");
    const diff = delta1.diff(delta2);
    const totalDelete = diff.ops.reduce((sum, op) => sum + (op.delete || 0), 0);
    const totalInsert = diff.ops.reduce((sum, op) => sum + (typeof op.insert === 'string' ? op.insert.length : 0), 0);
    expect(totalDelete).toBe(5);
    expect(totalInsert).toBe(5);
    expect(diff.ops.length).toBe(2);
    expect(diff.ops[0].delete).toBe(5);
    expect(diff.ops[1].insert).toBe("world");
  });
});