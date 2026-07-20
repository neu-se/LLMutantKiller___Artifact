import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with null firstOther", () => {
  it("should handle null firstOther correctly", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(null);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "test" }]);
  });
});