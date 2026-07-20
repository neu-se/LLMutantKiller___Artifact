import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should correctly handle empty string insertion with attributes", () => {
    const delta = new Delta();
    delta.insert("", { bold: true });
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0].insert).toBe("");
    expect(delta.ops[0].attributes).toEqual({ bold: true });
  });
});