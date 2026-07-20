import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with empty delta", () => {
  it("should handle empty delta composition correctly", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta();
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "test" }]);
  });
});