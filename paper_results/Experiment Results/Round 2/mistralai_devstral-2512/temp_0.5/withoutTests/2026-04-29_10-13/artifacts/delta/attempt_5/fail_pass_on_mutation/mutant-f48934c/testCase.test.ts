import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should handle insertion of empty string followed by object", () => {
    const delta = new Delta();
    delta.insert("");
    delta.insert({ key: "value" });
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0].insert).toEqual({ key: "value" });
  });
});