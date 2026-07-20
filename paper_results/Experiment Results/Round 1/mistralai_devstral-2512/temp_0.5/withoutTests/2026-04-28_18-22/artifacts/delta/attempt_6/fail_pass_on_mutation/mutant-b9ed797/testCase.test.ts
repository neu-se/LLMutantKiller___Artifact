import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly handle push when last operation is not mergeable", () => {
    const delta = new Delta();
    delta.insert("test");
    delta.push({ retain: 2, attributes: { bold: true } });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: "test" });
    expect(delta.ops[1]).toEqual({ retain: 2, attributes: { bold: true } });
  });
});