import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should handle non-string arguments correctly", () => {
    const delta = new Delta();
    const obj = { key: "value" };
    delta.insert(obj);
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0].insert).toEqual(obj);
  });
});