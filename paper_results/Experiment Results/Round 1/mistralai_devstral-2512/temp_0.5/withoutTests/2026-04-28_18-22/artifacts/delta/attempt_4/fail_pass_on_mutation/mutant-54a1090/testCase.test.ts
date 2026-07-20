import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should correctly compose when first operation is insert with length less than or equal to firstLeft", () => {
    const delta1 = new Delta().insert("ab");
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "ab" }]);
  });
});