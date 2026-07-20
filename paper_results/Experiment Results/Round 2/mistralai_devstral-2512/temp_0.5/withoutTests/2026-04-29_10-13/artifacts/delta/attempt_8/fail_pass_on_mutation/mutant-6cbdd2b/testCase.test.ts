import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain", () => {
  it("should handle retain with numeric value correctly", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "hello" }]);
  });
});